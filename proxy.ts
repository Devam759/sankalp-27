import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type RateLimitData = {
  globalApi: number;
  register: number;
  login: number;
  resetTime: number;
};

// Track IP request counts for rate limiting (Edge environment memory)
const requestCounts = new Map<string, RateLimitData>();

function getRateLimitResponse(retryAfter: number = 60) {
  return new NextResponse(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    { 
      status: 429, 
      headers: { 
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      } 
    }
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const proto = req.headers.get('x-forwarded-proto') || 'http';

  // 1. Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production' && proto !== 'https') {
    return NextResponse.redirect(`https://${req.headers.get('host')}${req.nextUrl.pathname}`, 301);
  }

  // Define limits
  const LIMIT_GLOBAL_API = 60;
  const LIMIT_REGISTER = 10;
  const LIMIT_LOGIN = 15;

  const isApi = pathname.startsWith('/api');
  const isRegister = pathname.startsWith('/api/register');
  const isLogin = pathname.startsWith('/login');

  if (isApi || isLogin) {
    const now = Date.now();
    
    // Cleanup old IPs occasionally to prevent edge memory leaks
    if (Math.random() < 0.05) {
      for (const [key, val] of Array.from(requestCounts.entries())) {
        if (val.resetTime < now) requestCounts.delete(key);
      }
    }

    // Rate limiting tracking
    let record = requestCounts.get(ip);
    if (!record || record.resetTime < now) {
      record = { globalApi: 0, register: 0, login: 0, resetTime: now + 60000 }; // 1 minute window
    }
    
    // Increment specific counters
    if (isApi) record.globalApi++;
    if (isRegister) record.register++;
    if (isLogin) record.login++;

    requestCounts.set(ip, record);

    // 2. Active Abuse Blocking (Rate Limiting)
    if (isRegister && record.register > LIMIT_REGISTER) {
      console.warn(`[BLOCKED] Registration spam detected from IP: ${ip}`);
      return getRateLimitResponse();
    }
    
    if (isLogin && record.login > LIMIT_LOGIN) {
      console.warn(`[BLOCKED] Login brute-force detected from IP: ${ip}`);
      // For pages, we can also return JSON if they fetch, or redirect, but since Next.js app router 
      // often fetches client components or RSC payloads, a 429 JSON response is safe.
      return getRateLimitResponse();
    }
    
    if (isApi && record.globalApi > LIMIT_GLOBAL_API) {
      console.warn(`[BLOCKED] Global API burst detected from IP: ${ip}`);
      return getRateLimitResponse();
    }

    // 3. Advanced Logging for sensitive API endpoints
    if (isApi && (pathname.includes('check-in') || pathname.includes('admin'))) {
      console.log(`[API TRAFFIC] SENSITIVE ENDPOINT | Method: ${req.method} | Path: ${pathname} | IP: ${ip} | User-Agent: ${req.headers.get('user-agent')}`);
    }

    // 4. Basic Response Headers setup
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply proxy to API routes and pages, ignoring static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};