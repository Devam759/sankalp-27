import type { Metadata } from 'next';
import WhySponsorUsClient from './WhySponsorUsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Why Sponsor Us | JKLU SANKALP 2027" },
  description: "Partner with JKLU SANKALP 2027 International Conference on Sustainable AI & Next-Gen Knowledge, Automation, Learning & Prediction. Explore Platinum, Gold, Silver, and Associate sponsorship packages.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/why-sponsor-us',
  },
  keywords: [
    "Why Sponsor JKLU SANKALP 2027",
    "Sankalp 2027 Sponsorship Packages",
    "Conference Sponsorship Opportunities",
    "AI Conference Partnerships India",
    "Sustainable AI Sponsorship"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "Why Sponsor JKLU SANKALP 2027?",
    description: "Partner with us to shape the future of Sustainable AI and next-generation technologies at JKLU SANKALP 2027.",
    url: 'https://sankalp.jklu.edu.in/why-sponsor-us',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function WhySponsorUsPage() {
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
        name: 'Why Sponsor Us',
        item: 'https://sankalp.jklu.edu.in/why-sponsor-us',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <WhySponsorUsClient />
    </>
  );
}
