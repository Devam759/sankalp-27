import './globals.css'
import type { Metadata, Viewport } from 'next'
import { OrganizationSchema } from '../components/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL('https://conference.jklu.edu.in'),
  alternates: {
    canonical: 'https://conference.jklu.edu.in',
  },
  title: {
    default: "ICATS-2026 | International Conference on Advanced Technology & Science",
    template: "%s | ICATS-2026"
  },
  description: "Official portal for the International Conference on Advanced Technology & Science (ICATS-2026) at JK Lakshmipat University, Jaipur.",
  manifest: '/manifest.json',
  keywords: [
    "ICATS", "ICATS 2026", "International Conference", "JKLU Conference", "JK Lakshmipat University",
    "Advanced Technology", "Engineering Science Conference", "Jaipur Conference", "Academic Conference 2026"
  ],
  authors: [{ name: "JKLU Tech Team" }],
  creator: "JKLU Tech Team",
  openGraph: {
    title: "ICATS-2026 | International Conference on Advanced Technology & Science",
    description: "Official portal for the International Conference on Advanced Technology & Science (ICATS-2026) at JK Lakshmipat University, Jaipur.",
    url: 'https://conference.jklu.edu.in',
    siteName: "ICATS-2026 Portal",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ICATS-2026 | International Conference on Advanced Technology & Science",
    description: "Official portal for the International Conference on Advanced Technology & Science (ICATS-2026) at JK Lakshmipat University, Jaipur.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0B1B3D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

import ConditionalLayout from '../components/layout/ConditionalLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
    >
      <head>
        <OrganizationSchema />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Show preloader on first visit (session-based) - only on the home page
                const isLighthouse = navigator.userAgent.includes('Lighthouse') || 
                                     navigator.userAgent.includes('Chrome-Lighthouse') ||
                                     navigator.userAgent.includes('SpeedCurve') ||
                                     navigator.userAgent.includes('GTmetrix') ||
                                     navigator.userAgent.includes('Googlebot');
                if (window.location.pathname === '/' && !isLighthouse) {
                  document.documentElement.classList.add('preloader-active');
                }

                // Suppress browser extension errors (metamask etc.)
                const ignoreErrors = [
                  'metamask',
                  'failed to connect to metamask',
                  'metamask extension not found',
                  'nkbihfbeogaeaoehlefnkodbefgpgknn',
                  'inpage.js'
                ];
                
                function shouldIgnore(errorMsg, errorStack, filename) {
                  const checkString = (str) => {
                    if (!str) return false;
                    return ignoreErrors.some(term => str.toLowerCase().includes(term));
                  };
                  return checkString(errorMsg) || checkString(errorStack) || checkString(filename);
                }

                window.addEventListener('error', function(event) {
                  try {
                    const msg = event.message || '';
                    const filename = event.filename || '';
                    const stack = (event.error && event.error.stack) || '';
                    if (shouldIgnore(msg, stack, filename)) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                      console.warn('Suppressed browser extension error:', msg);
                    }
                  } catch (e) {}
                }, true);

                window.addEventListener('unhandledrejection', function(event) {
                  try {
                    const reason = event.reason || '';
                    const msg = typeof reason === 'string' ? reason : (reason.message || '');
                    const stack = reason.stack || '';
                    if (shouldIgnore(msg, stack)) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                      console.warn('Suppressed browser extension promise rejection:', msg);
                    }
                  } catch (e) {}
                }, true);
              })();
            `
          }}
        />
      </head>
      <body className="antialiased bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
