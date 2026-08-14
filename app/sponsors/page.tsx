import type { Metadata } from 'next';
import SponsorsClient from './SponsorsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Sponsors & Partners | JKLU SANKALP 2027" },
  description: "Explore sponsorship opportunities for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur. Platinum, Gold, Silver, and Associate packages available.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/sponsors',
  },
  keywords: [
    "JKLU SANKALP 2027 Sponsors",
    "Sankalp Sponsors",
    "Conference Sponsorship Opportunities",
    "JKLU Industry Partnerships",
    "AI Conference Sponsors India"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "Sponsors & Partners | JKLU SANKALP 2027",
    description: "Partner with JKLU SANKALP 2027 at JK Lakshmipat University to engage with global AI researchers, leaders, and innovators.",
    url: 'https://sankalp.jklu.edu.in/sponsors',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function SponsorsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sankalp.jklu.edu.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sponsors',
        item: 'https://sankalp.jklu.edu.in/sponsors',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SponsorsClient />
    </>
  );
}
