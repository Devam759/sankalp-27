import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL('https://sankalp.jklu.edu.in'),
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  title: {
    default: "Sankalp '27 | JK Lakshmipat University",
    template: "%s | Sankalp '27"
  },
  description: "Official website for the Sankalp 2027 International Conference at JK Lakshmipat University, Jaipur.",
  manifest: '/manifest.json',
  keywords: [
    "Sankalp", "Sankalp 2027", "Sankalp '27", "JKLU", "JK Lakshmipat University", "Jaipur", "International Conference", "Conference"
  ],
  authors: [{ name: "JKLU Tech Team" }],
  creator: "JKLU Tech Team",
  openGraph: {
    title: "Sankalp '27 | JK Lakshmipat University",
    description: "Official website for the Sankalp 2027 International Conference at JK Lakshmipat University, Jaipur.",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "Sankalp '27 Website",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sankalp '27 | JK Lakshmipat University",
    description: "Official website for the Sankalp 2027 International Conference at JK Lakshmipat University, Jaipur.",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  }
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `
          }}
        />
      </head>
      <body className={`${merriweather.variable} ${sourceSans.variable} font-sans antialiased bg-brand-cloud text-brand-ink min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
