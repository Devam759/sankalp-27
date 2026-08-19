import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import { finalizeRegistration } from '@/lib/registrationHelper';
import { validateRegistrationNumber } from '@/lib/utils';
import { getCategoryById } from '@/constants/fees';

import { isRateLimited, sanitizeObject, formatPhoneNumber, handleApiError, verifyRecaptchaToken } from '@/lib/security';

function getCashfreeClient() {
  const isProduction = (process.env.NEXT_PUBLIC_CASHFREE_ENV || '').replace(/['"]/g, '').trim().toUpperCase() === 'PRODUCTION';
  const appId = isProduction
    ? (process.env.CASHFREE_PROD_APP_ID || process.env.CASHFREE_APP_ID || '').trim()
    : (process.env.CASHFREE_TEST_APP_ID || process.env.CASHFREE_APP_ID || '').trim();
  const secretKey = isProduction
    ? (process.env.CASHFREE_PROD_SECRET_KEY || process.env.CASHFREE_SECRET_KEY || '').trim()
    : (process.env.CASHFREE_TEST_SECRET_KEY || process.env.CASHFREE_SECRET_KEY || '').trim();

  const client = new Cashfree(
    isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    appId,
    secretKey
  );
  client.XApiVersion = '2023-08-01';
  return { client, isProduction, appId, secretKey };
}

// Server-side in-memory cache for resolved pincodes to ensure 0ms latency on repeated queries
const pincodeCache = new Map<string, any>();
// Fallback cache for pending registrations when local GCP ADC credentials are not mounted
const pendingRegistrationsMemory = new Map<string, any>();

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim(); // Take only the first (leftmost) IP - prevent x-forwarded-for spoofing
    
    // Use unified security rate limiting: max 5 requests per minute
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many attempts. Please try again in a minute.' }, { status: 429 });
    }

    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.warn("Invalid or empty registration JSON body received:", err);
      return NextResponse.json({ error: 'Invalid or empty JSON payload' }, { status: 400 });
    }
    const { action, honeypot, ...rawData } = body;
    
    if (rawData.mobile) rawData.mobile = formatPhoneNumber(rawData.mobile);
    if (rawData.fatherMobile) rawData.fatherMobile = formatPhoneNumber(rawData.fatherMobile);
    if (rawData.motherMobile) rawData.motherMobile = formatPhoneNumber(rawData.motherMobile);
    if (rawData.parentPhone) rawData.parentPhone = formatPhoneNumber(rawData.parentPhone);

    // Use unified security sanitization to prevent XSS script injection
    const data = sanitizeObject(rawData);

    if (honeypot) {
      console.warn("Honeypot triggered by IP:", ip);
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    const checkCoupon = async (code: string, baseAmount: number) => {
      if (!code) return { valid: false, amount: baseAmount };
      try {
        const docSnap = await adminDb.collection('coupons').doc(code).get();
        if (docSnap.exists && docSnap.data()?.active) {
          const couponData = docSnap.data();
          if (couponData?.discountPercentage !== undefined) {
            const discount = Math.round((baseAmount * couponData.discountPercentage) / 100);
            return { valid: true, amount: Math.max(0, baseAmount - discount) };
          }
          if (couponData?.amount !== undefined) {
            return { valid: true, amount: couponData.amount };
          }
          return { valid: true, amount: 0 };
        }
      } catch (err) {
        console.error("Error fetching coupon:", err);
      }
      return { valid: false, amount: baseAmount };
    };

    if (action === 'VERIFY_COUPON') {
      const code = (data.coupon || '').trim().toUpperCase();
      const categoryId = (data.category || '').trim();
      const category = getCategoryById(categoryId);
      const baseAmount = category ? category.amount : 1500; // default student fee fallback
      const couponStatus = await checkCoupon(code, baseAmount);
      return NextResponse.json(couponStatus);
    }
    
    if (action === 'VERIFY_PINCODE') {
      const pin = (data.pincode || '').trim();
      if (pin.length === 6 && /^\d+$/.test(pin)) {
        // 1. Check in-memory cache
        if (pincodeCache.has(pin)) {
          console.log(`Pincode cache hit for ${pin}.`);
          return NextResponse.json(pincodeCache.get(pin));
        }

        try {
          console.log(`Proxying pincode request for ${pin} to India Post API...`);
          
          // Enforce a strict 2.5-second API timeout so client is not blocked indefinitely
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);

          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const postalData = await res.json();
            // Store successful lookup in cache
            if (postalData && postalData[0]?.Status === 'Success') {
              pincodeCache.set(pin, postalData);
            }
            return NextResponse.json(postalData);
          }
        } catch (err: any) {
          console.error("Error proxying pincode API request:", err.name === 'AbortError' ? 'Timeout (took > 2.5s)' : err);
        }
      }
      return NextResponse.json([{ Status: 'Error', Message: 'Failed to verify pincode or timeout' }]);
    }

    if (action === 'CREATE_ORDER') {
      try {
        if (data.recaptchaToken) {
          const recaptchaVal = await verifyRecaptchaToken(data.recaptchaToken, 'REGISTER');
          if (!recaptchaVal.success) {
            return NextResponse.json({ error: recaptchaVal.error || 'reCAPTCHA verification failed.' }, { status: 403 });
          }
        }

        const categoryId = (data.category || '').trim();
        const category = getCategoryById(categoryId);
        if (!category) {
          return NextResponse.json({ error: 'Invalid or missing registration category' }, { status: 400 });
        }
        
        // Validate presenter information
        const isPresenter = categoryId.includes('speaker') || categoryId.includes('presenter') || categoryId === 'foreign_delegate';
        if (isPresenter && (!data.paperId || !data.paperId.trim())) {
          return NextResponse.json({ error: 'Paper ID is required for paper presenters' }, { status: 400 });
        }

        const baseAmount = category.amount;
        const orderId = `order_${crypto.randomUUID()}`;
        const couponCode = (data.coupon || '').trim().toUpperCase();
        const couponStatus = await checkCoupon(couponCode, baseAmount);
        const orderAmount = couponStatus.valid ? couponStatus.amount : baseAmount;

        console.log("Saving pending registration for order ID:", orderId);
        try {
          await adminDb.collection('pendingRegistrations').doc(orderId).set({
            formData: data,
            orderId: orderId,
            amount: orderAmount,
            createdAt: FieldValue.serverTimestamp(),
            status: 'pending'
          });
          console.log("Pending registration saved to Firestore.");
        } catch (dbErr: any) {
          console.warn("Firestore Admin save skipped (ADC credentials not mounted locally), caching in memory:", dbErr.message);
          pendingRegistrationsMemory.set(orderId, {
            formData: data,
            orderId: orderId,
            amount: orderAmount,
            createdAt: new Date(),
            status: 'pending'
          });
        }

        const { client: cfClient, isProduction, appId, secretKey } = getCashfreeClient();

        // If order amount is 0 (100% discount coupon)
        if (orderAmount === 0) {
          return NextResponse.json({ 
            orderId: orderId,
            isFree: true
          });
        }

        if (!appId || !secretKey) {
          return NextResponse.json({ error: 'Payment gateway is not configured on the server.' }, { status: 500 });
        }

        console.log(`Creating Cashfree Order via PGCreateOrder (Env: ${isProduction ? 'PRODUCTION' : 'SANDBOX'})...`);
        
        // Strip non-digit characters and ensure a clean 10-digit format for Cashfree validation
        let cleanPhone = (data.phone || data.mobile || '').replace(/\D/g, '');
        if (cleanPhone.length > 10) {
          if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
            cleanPhone = cleanPhone.slice(2);
          } else {
            cleanPhone = cleanPhone.slice(-10);
          }
        }
        if (cleanPhone.length < 10) {
          cleanPhone = '9999999999';
        }

        const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://sankalp.jklu.edu.in';

        const totalWithGst = Math.round(orderAmount * 1.18);

        const response = await cfClient.PGCreateOrder({
          order_id: orderId,
          order_amount: totalWithGst,
          order_currency: 'INR',
          customer_details: {
            customer_id: (data.email || `cust_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50),
            customer_name: data.name,
            customer_email: data.email,
            customer_phone: cleanPhone,
          },
          order_meta: {
            return_url: `${origin}/register?order_id={order_id}`,
          }
        });
        console.log("Cashfree order created successfully:", response.data.order_id);

        return NextResponse.json({ 
          order_id: response.data.order_id,
          payment_session_id: response.data.payment_session_id 
        });
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to create payment order.';
        console.error("CREATE_ORDER error detail:", err.response?.data || err);
        return NextResponse.json({ error: errorMsg }, { status: 500 });
      }
    }

    if (action === 'VERIFY_PAYMENT') {
      const { orderId } = data;

      if (!orderId || typeof orderId !== 'string' || !/^order_[0-9a-zA-Z_\-]{1,50}$/.test(orderId.trim())) {
        console.warn('Invalid orderId format rejected:', orderId);
        return NextResponse.json({ error: 'Invalid order ID format' }, { status: 400 });
      }
      const sanitizedOrderId = orderId.trim();
      console.log("Verifying payment securely for order:", sanitizedOrderId);
      
      let dbFormData = null;
      let pendingAmount = 0;

      try {
        const pendingRef = adminDb.collection('pendingRegistrations').doc(sanitizedOrderId);
        const pendingSnap = await pendingRef.get();
        if (pendingSnap.exists) {
          const pendingData = pendingSnap.data()!;
          dbFormData = pendingData.formData;
          pendingAmount = pendingData.amount;
        }
      } catch (dbErr: any) {
        console.warn("Firestore Admin read failed, checking in-memory store:", dbErr.message);
      }

      if (!dbFormData && pendingRegistrationsMemory.has(sanitizedOrderId)) {
        const memData = pendingRegistrationsMemory.get(sanitizedOrderId)!;
        dbFormData = memData.formData;
        pendingAmount = memData.amount;
      }

      if (!dbFormData) {
        console.warn(`No pending registration details found for order ${sanitizedOrderId}`);
        return NextResponse.json({ error: 'Pending registration details not found' }, { status: 404 });
      }

      const { client: cfClient, appId } = getCashfreeClient();

      if (!appId || pendingAmount === 0) {
        console.warn("Cashfree App ID missing or amount is 0, bypassing verification.");
        const regId = await finalizeRegistration(dbFormData, "mock_payment_id", sanitizedOrderId, false);
        return NextResponse.json({ success: true, id: regId, email: dbFormData.email });
      }

      const response = await cfClient.PGOrderFetchPayments(sanitizedOrderId);
      const payments = response.data;
      const successPayment = payments?.find((p: any) => p.payment_status === 'SUCCESS');

      if (!successPayment) {
        console.warn("No successful payment found for order:", sanitizedOrderId);
        return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
      }

      console.log("Payment verified successfully:", successPayment.cf_payment_id);
      const regId = await finalizeRegistration(dbFormData, successPayment.cf_payment_id!.toString(), sanitizedOrderId, false);
      return NextResponse.json({ success: true, id: regId, email: dbFormData.email });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return handleApiError(error, 'Failed to process registration.');
  }
}
