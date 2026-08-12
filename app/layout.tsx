import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://sankalp.jklu.edu.in'),
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  title: {
    default: "JKLU SANKALP 2027 | International Conference | JKLU Jaipur",
    template: "%s | JKLU SANKALP 2027"
  },
  description: "Join JKLU SANKALP 2027 at JKLU Jaipur - the premier International Conference on Sustainable AI, Data Science & Next-Gen Tech. Submit your research papers today!",
  manifest: '/manifest.json',
  keywords: [
    "JKLU SANKALP 2027",
    "sankalp",
    "sankalp27",
    "sankalp 2027",
    "sankalp '27",
    "sankalp jklu",
    "jklu sankalp",
    "sankalp conference",
    "sankalp jklu conference",
    "sankalp 2027 jklu",
    "sankalp jaipur",
    "sankalp international conference",
    "iet jklu sankalp",
    "JKLU",
    "JK Lakshmipat University",
    "Jaipur International Conference 2027",
    "Sustainable AI Conference",
    "Data Science Conference Jaipur",
    "Springer LNCS Conference India",
    "Scopus Indexed Conference 2027"
  ],
  authors: [{ name: "Institute of Engineering & Technology, JKLU", url: "https://jklu.edu.in" }],
  creator: "JK Lakshmipat University",
  publisher: "JK Lakshmipat University",
  category: "Academic Conference",
  openGraph: {
    title: "JKLU SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for JKLU SANKALP 2027 on Sustainable AI, Data Science & Next-Gen Tech. Submit research papers today!",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "JKLU SANKALP 2027 International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'JKLU SANKALP 2027 Conference - JK Lakshmipat University Jaipur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "JKLU SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for JKLU SANKALP 2027 on Sustainable AI & Next-Gen Knowledge.",
    images: ['/Images/campus/jklu_campus.webp'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1B3D',
  width: 'device-width',
  initialScale: 1,
}

import { Plus_Jakarta_Sans, Outfit, Tiro_Devanagari_Hindi } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-outfit',
})

const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-devanagari-var',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet" />
        {/* Preload Sankalp logo as it is always the LCP element in the Navbar */}
        <link
          rel="preload"
          href="/logos/Sankalp logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        <Script 
          id="google-recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcnfYAtAAAAANwsn9-4TPzCpIPHLfQ2Mq-C5LQk'}`}
          strategy="afterInteractive"
        />
        <Script id="extension-error-handler" strategy="beforeInteractive">
          {`
            (function() {
              const handler = (event) => {
                try {
                  const isExtensionError = 
                    (event.filename && event.filename.includes('chrome-extension://')) ||
                    (event.message && (event.message.includes('MetaMask') || event.message.includes('extension'))) ||
                    (event.reason && (
                      (event.reason.stack && event.reason.stack.includes('chrome-extension://')) ||
                      (event.reason.message && (event.reason.message.includes('MetaMask') || event.reason.message.includes('extension')))
                    ));
                  
                  if (isExtensionError) {
                    event.stopImmediatePropagation();
                  }
                } catch (e) {}
              };
              window.addEventListener('error', handler, true);
              window.addEventListener('unhandledrejection', handler, true);
            })();
          `}
        </Script>
      </head>
      <body className={`${plusJakartaSans.variable} ${outfit.variable} ${tiroDevanagariHindi.variable} font-sans antialiased bg-brand-cloud text-brand-ink min-h-screen`}>
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
