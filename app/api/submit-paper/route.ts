import { NextResponse } from 'next/server';
import { isRateLimited, sanitizeObject, formatPhoneNumber } from '@/lib/security';
import { submitPaperRecord } from '@/lib/paperSubmissionHelper';

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();

    // Enforce rate limiting: max 5 submissions per minute per IP
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many attempts. Please try again in a minute.' }, { status: 429 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { honeypot, ...rawData } = body;
    if (honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    if (rawData.authorPhone) {
      rawData.authorPhone = formatPhoneNumber(rawData.authorPhone);
    }

    const data = sanitizeObject(rawData);

    // Validate mandatory paper submission fields
    if (!data.authorName || !data.authorEmail || !data.authorPhone || !data.affiliation || !data.paperTitle || !data.abstract || !data.trackId) {
      return NextResponse.json({ error: 'Please fill in all mandatory submission fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorEmail)) {
      return NextResponse.json({ error: 'Please enter a valid author email address.' }, { status: 400 });
    }

    const submissionResult = await submitPaperRecord({
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      authorPhone: data.authorPhone,
      affiliation: data.affiliation,
      country: data.country || 'India',
      paperTitle: data.paperTitle,
      abstract: data.abstract,
      trackId: data.trackId,
      trackTitle: data.trackTitle || 'General',
      keywords: data.keywords || '',
      coAuthors: data.coAuthors || '',
      documentUrl: data.documentUrl || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Paper submitted successfully!',
      submission: submissionResult,
    });
  } catch (err: any) {
    console.error('Error in /api/submit-paper:', err);
    return NextResponse.json({ error: err.message || 'Internal server error while processing paper submission.' }, { status: 500 });
  }
}
