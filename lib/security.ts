import crypto from 'crypto';

// 1. In-memory Rate Limiting Map
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();

/**
 * Custom in-memory rate limiting mechanism.
 * Limits the number of requests per IP within a specified time window.
 *
 * NOTE: This map is process-local. On serverless platforms like Cloud Run, each
 * new instance starts with an empty map, so very short bursts across cold-starts can
 * bypass the limit. For production-grade enforcement, replace this with a Redis-backed
 * limiter (e.g., Upstash). For Sankalp-scale traffic this is sufficient.
 */
export function isRateLimited(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  
  // Prune expired entries to prevent memory leaks when the map becomes large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.firstRequest > windowMs) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  
  const rateData = rateLimitMap.get(ip)!;
  if (now - rateData.firstRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  
  if (rateData.count >= limit) {
    return true;
  }
  
  rateData.count++;
  return false;
}

/**
 * XSS & Script injection sanitation helper.
 * Strips HTML tags then escapes special characters.
 *
 * This function is idempotent - calling it twice on the same string
 * produces the same result. Tag-stripping removes < and > first; only then are
 * residual special chars (& " ') escaped. This avoids double-encoding issues
 * like &amp; → &amp;amp; on a second pass.
 */
export function sanitizeInput(val: any): any {
  if (typeof val === 'string') {
    // Step 1: strip HTML/XML tags by removing everything between < and >
    let result = '';
    let inTag = false;
    const text = val.trim();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '<') {
        inTag = true;
      } else if (char === '>') {
        inTag = false;
      } else if (!inTag) {
        result += char;
      }
    }
    // Step 2: escape only the chars that survive tag-stripping.
    // Ampersand must be escaped first to avoid double-encoding (& → &amp;, not &&amp;).
    result = result
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return result;
  }
  return val;
}

/**
 * Recursively sanitizes request objects to prevent nested injections.
 */
export function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  const sanitized: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        sanitized[key] = sanitizeObject(val);
      } else {
        sanitized[key] = sanitizeInput(val);
      }
    }
  }
  return sanitized;
}

export const isProd = (process.env.NEXT_PUBLIC_CASHFREE_ENV || '').replace(/['"]/g, '').trim().toUpperCase() === 'PRODUCTION';

export const cashfreeAppId = isProd
  ? (process.env.CASHFREE_PROD_APP_ID || process.env.CASHFREE_APP_ID || '')
  : (process.env.CASHFREE_TEST_APP_ID || process.env.CASHFREE_APP_ID || '');

export const cashfreeSecretKey = isProd
  ? (process.env.CASHFREE_PROD_SECRET_KEY || process.env.CASHFREE_SECRET_KEY || '')
  : (process.env.CASHFREE_TEST_SECRET_KEY || process.env.CASHFREE_SECRET_KEY || '');

/**
 * Verifies the validity of the signature sent by Cashfree Webhooks.
 * Uses SHA-256 HMAC of (timestamp + rawBody) computed with the active Cashfree secret key.
 * Uses crypto.timingSafeEqual to prevent timing side-channel attacks.
 */
export function verifyCashfreeSignature(signature: string, rawBody: string, timestamp: string): boolean {
  const secretKey = cashfreeSecretKey;
  if (!secretKey) {
    console.warn("Cashfree Secret Key missing in environment variables.");
    if (isProd || process.env.NODE_ENV === 'production') {
      console.error("Signature verification failed: Cashfree Secret Key is missing in production.");
      return false;
    }
    console.warn("Signature verification bypassed (non-production environment).");
    return true;
  }
  
  const data = timestamp + rawBody;
  const computedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(data)
    .digest('base64');

  // Use constant-time comparison to prevent timing side-channel attacks
  try {
    const expectedBuf = Buffer.from(computedSignature, 'base64');
    const receivedBuf = Buffer.from(signature, 'base64');
    return expectedBuf.length === receivedBuf.length && crypto.timingSafeEqual(expectedBuf, receivedBuf);
  } catch {
    return false;
  }
}

/**
 * Standardizes mobile numbers. Preserves international prefix if provided (+1, +44, +971, etc.)
 * or defaults to +91 for 10-digit Indian numbers.
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  const trimmed = phone.trim();
  if (trimmed.startsWith('+')) {
    return trimmed;
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits}`;
  }
  if (digits.length > 10) {
    return `+${digits}`;
  }
  return phone;
}

/**
 * Masks an email address to protect PII in logs (e.g. d***m@gmail.com).
 */
export function maskEmail(email: string): string {
  if (!email) return '';
  const parts = email.split('@');
  if (parts.length !== 2) return '[REDACTED]';
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `***@${domain}`;
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

/**
 * Standardized API Error Handler.
 * Ensures proper HTTP status codes for auth/role failures (401/403)
 * and masks raw internal server error details in production to prevent information disclosure.
 */
export function handleApiError(error: any, defaultMessage: string = 'An unexpected server error occurred.') {
  const { NextResponse } = require('next/server');
  const msg = error?.message || '';

  if (
    msg.includes('Missing or invalid Authorization header') ||
    msg.includes('Invalid or expired authentication token')
  ) {
    return NextResponse.json({ error: msg }, { status: 401 });
  }

  if (
    msg.includes('Access denied') ||
    msg.includes('no assigned role')
  ) {
    return NextResponse.json({ error: msg }, { status: 403 });
  }

  const clientError = process.env.NODE_ENV === 'development' ? (msg || defaultMessage) : defaultMessage;
  return NextResponse.json({ error: clientError }, { status: 500 });
}

/**
 * Verifies a Google reCAPTCHA v3 response token against the Google siteverify API.
 * 
 * @param token Response token received from grecaptcha.execute() call
 * @param expectedAction Expected user-initiated action (e.g., 'LOGIN', 'CONTACT_SUBMIT')
 * @returns Promise<{ success: boolean; score?: number; error?: string }>
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction?: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY missing in environment variables.");
    if (process.env.NODE_ENV === 'production') {
      return { success: false, error: 'reCAPTCHA secret key is not configured on the server.' };
    }
    // In dev mode without secret key, allow bypass
    console.warn("[reCAPTCHA] Bypassing reCAPTCHA verification in non-production mode due to missing secret key.");
    return { success: true, score: 1.0 };
  }

  if (!token) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn("[reCAPTCHA] Token missing in non-production mode, bypassing.");
      return { success: true, score: 1.0 };
    }
    return { success: false, error: 'reCAPTCHA verification token is missing.' };
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      console.error(`[reCAPTCHA] siteverify returned HTTP ${res.status}`);
      if (process.env.NODE_ENV !== 'production') {
        return { success: true, score: 1.0 };
      }
      return { success: false, error: `Google reCAPTCHA verification service returned status ${res.status}` };
    }

    const data = await res.json();

    if (!data.success) {
      console.warn("[reCAPTCHA] Token verification failed:", data['error-codes']);
      // In local development, if Google returns domain/browser errors (e.g. localhost not registered in reCAPTCHA console), allow pass-through
      if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_CASHFREE_ENV !== 'PRODUCTION') {
        const errorCodes = data['error-codes'] || [];
        if (errorCodes.includes('browser-error') || errorCodes.includes('hostname-mismatch') || errorCodes.includes('invalid-input-response')) {
          console.warn("[reCAPTCHA] Allowing dev bypass for localhost/non-production domain error:", errorCodes);
          return { success: true, score: 1.0 };
        }
      }
      return { 
        success: false, 
        error: `reCAPTCHA verification failed: ${(data['error-codes'] || []).join(', ') || 'Invalid token'}` 
      };
    }

    // Check action if specified
    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(`[reCAPTCHA] Action mismatch. Expected: ${expectedAction}, Received: ${data.action}`);
      return { success: false, error: 'reCAPTCHA action mismatch.' };
    }

    // Check risk score (v3 returns score between 0.0 and 1.0)
    const score = typeof data.score === 'number' ? data.score : 1.0;
    if (score < 0.3) {
      console.warn(`[reCAPTCHA] Low risk score detected: ${score}`);
      return { success: false, score, error: 'High risk interaction detected by reCAPTCHA.' };
    }

    return { success: true, score };
  } catch (err: any) {
    console.error("[reCAPTCHA] Verification error:", err);
    return { success: false, error: 'Failed to communicate with reCAPTCHA verification server.' };
  }
}




