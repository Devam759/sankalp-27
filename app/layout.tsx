import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://sankalp.jklu.edu.in'),
  alternates: {
    canonical: './',
  },
  title: {
    default: "Sankalp '27 | International Conference | JK Lakshmipat University",
    template: "%s | Sankalp '27 - JKLU"
  },
  description: "Official portal for Sankalp '27 – International Conference on Sustainable AI, Data Science & Emerging Technologies at JK Lakshmipat University (JKLU), Jaipur.",
  manifest: '/manifest.json',
  keywords: [
    "Sankalp",
    "Sankalp 2027",
    "Sankalp '27",
    "JKLU",
    "JK Lakshmipat University",
    "Jaipur International Conference",
    "Sustainable AI Conference",
    "Data Science Conference Jaipur",
    "Springer LNCS Conference",
    "Scopus Indexed Conference India",
    "IET JKLU",
    "Artificial Intelligence Conference 2027"
  ],
  authors: [{ name: "Institute of Engineering & Technology, JKLU", url: "https://jklu.edu.in" }],
  creator: "JK Lakshmipat University",
  publisher: "JK Lakshmipat University",
  category: "Academic Conference",
  openGraph: {
    title: "Sankalp '27 | International Conference at JK Lakshmipat University",
    description: "Premier International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction. Organized by IET, JKLU Jaipur.",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "Sankalp '27 International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/Images/jklu.jpg',
        width: 1200,
        height: 630,
        alt: 'Sankalp 2027 Conference - JK Lakshmipat University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sankalp '27 | JK Lakshmipat University",
    description: "International Conference on Sustainable AI & Future Tech at JKLU Jaipur.",
    images: ['/Images/jklu.jpg'],
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
  maximumScale: 1,
}

import { Merriweather, Source_Sans_3 } from 'next/font/google'

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair', // keep variable name same so tailwind config doesn't need to change
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
      <body className={`${merriweather.variable} ${sourceSans.variable} font-sans antialiased bg-brand-cloud text-brand-ink min-h-screen`}>
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
