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
    default: "SANKALP 2027 | International Conference | JKLU Jaipur",
    template: "%s | SANKALP 2027"
  },
  description: "Join SANKALP 2027 at JKLU Jaipur—the premier International Conference on Sustainable AI, Data Science & Next-Gen Tech. Submit your research papers today!",
  manifest: '/manifest.json',
  keywords: [
    "sankalp",
    "sankalp27",
    "sankalp 2027",
    "sankalp '27",
    "sankalp jklu",
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
    title: "SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for SANKALP 2027 on Sustainable AI, Data Science & Next-Gen Tech. Submit research papers today!",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "SANKALP 2027 International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/Images/jklu.jpg',
        width: 1200,
        height: 630,
        alt: 'SANKALP 2027 Conference - JK Lakshmipat University Jaipur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for SANKALP 2027 on Sustainable AI & Next-Gen Knowledge.",
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
}

import { Merriweather, Source_Sans_3 } from 'next/font/google'

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair', // keep variable name same so tailwind config doesn't need to change
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
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
        <link
          rel="preload"
          href="/_next/image?url=%2FImages%2Fhero%2FDJI_0063.webp&w=1200&q=75"
          as="image"
          type="image/webp"
          // @ts-ignore
          fetchpriority="high"
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
      <body className={`${merriweather.variable} ${sourceSans.variable} font-sans antialiased bg-brand-cloud text-brand-ink min-h-screen`}>
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
