import type { Metadata } from 'next';
import SponsorsClient from './SponsorsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Sponsors | Sankalp '27 | JKLU",
  description: "Explore sponsorship packages (Platinum, Gold, Silver, Associate) for Sankalp '27 International Conference at JK Lakshmipat University, Jaipur. Connect with global technology leaders and researchers.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/sponsors',
  },
  keywords: [
    "Sankalp Sponsors",
    "Conference Sponsorship Opportunities",
    "JKLU Industry Partnerships",
    "AI Conference Sponsors India"
  ],
  openGraph: {
    title: "Sponsorship Opportunities - SANKALP '27 | JKLU",
    description: "Partner with Sankalp 2027 at JK Lakshmipat University to engage with global AI researchers, leaders, and innovators.",
    url: 'https://sankalp.jklu.edu.in/sponsors',
    siteName: "Sankalp '27 Website",
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
