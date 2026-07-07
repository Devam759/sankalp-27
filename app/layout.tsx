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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-cloud text-brand-ink min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
