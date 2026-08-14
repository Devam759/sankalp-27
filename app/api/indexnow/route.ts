import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '3ae2c2d18ecf403e80b173d3575c6611';
const HOST_DOMAIN = 'sankalp.jklu.edu.in';
const BASE_URL = `https://${HOST_DOMAIN}`;

const PUBLIC_ROUTES = [
  '',
  '/about',
  '/call-for-papers',
  '/sessions',
  '/registration',
  '/committee',
  '/venue',
  '/sponsors',
  '/faq',
  '/contact',
  '/credits',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-policy',
  '/shipping-policy',
];

export async function POST() {
  return triggerIndexNow();
}

export async function GET() {
  return triggerIndexNow();
}

async function triggerIndexNow() {
  const urlList = PUBLIC_ROUTES.map((path) => `${BASE_URL}${path}`);
  const keyLocation = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

  const payload = {
    host: HOST_DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList,
  };

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      return NextResponse.json({
        success: true,
        message: 'IndexNow real-time URL indexing submitted successfully to Bing & partner search engines.',
        submittedCount: urlList.length,
        urlList,
      });
    }

    const text = await res.text();
    return NextResponse.json(
      {
        success: false,
        status: res.status,
        message: 'IndexNow submission failed',
        error: text,
      },
      { status: res.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to dispatch IndexNow request',
        error: err.message || String(err),
      },
      { status: 500 }
    );
  }
}
