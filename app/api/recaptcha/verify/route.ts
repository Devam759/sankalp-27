import { NextResponse } from 'next/server';
import { verifyRecaptchaToken, isRateLimited, handleApiError } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();

    if (isRateLimited(ip, 10, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const { token, action } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'reCAPTCHA token is required.' }, { status: 400 });
    }

    const verification = await verifyRecaptchaToken(token, action);

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || 'reCAPTCHA verification failed.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, score: verification.score });
  } catch (error: any) {
    console.error('reCAPTCHA Verification API Error:', error);
    return handleApiError(error, 'Failed to verify reCAPTCHA token.');
  }
}
