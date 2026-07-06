import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://aarambh.jklu.edu.in'),
  alternates: {
    canonical: 'https://aarambh.jklu.edu.in',
  },
  title: {
    default: "Sankalp '27 | JK Lakshmipat University",
    template: "%s | Sankalp '27"
  },
  description: "Official welcome portal for Sankalp 2027 at JK Lakshmipat University, Jaipur.",
  manifest: '/manifest.json',
  keywords: [
    "Sankalp", "Sankalp 2027", "Sankalp '27", "JKLU", "JK Lakshmipat University", "Jaipur"
  ],
  authors: [{ name: "JKLU Tech Team" }],
  creator: "JKLU Tech Team",
  openGraph: {
    title: "Sankalp '27 | JK Lakshmipat University",
    description: "Official welcome portal for Sankalp 2027 at JK Lakshmipat University, Jaipur.",
    url: 'https://aarambh.jklu.edu.in',
    siteName: "Sankalp '27 Portal",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sankalp '27 | JK Lakshmipat University",
    description: "Official welcome portal for Sankalp 2027 at JK Lakshmipat University, Jaipur.",
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
      <body className="antialiased bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
