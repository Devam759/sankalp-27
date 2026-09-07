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
    "Sustainable AI Sponsorship",
    "why sponsor conference india",
    "conference sponsorship benefits jaipur",
    "sponsor academic event india 2027",
    "corporate sponsorship conference jaipur",
    "brand visibility conference india"
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should our company sponsor JKLU SANKALP 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sponsoring SANKALP 2027 offers direct visibility to over 1,000 international delegates, academic leaders, engineers, and researchers in Sustainable AI and Next-Gen Computing. Benefits include keynote speaking slots, dedicated booth space, brand placement across publications, and access to top research talent.',
        },
      },
      {
        '@type': 'Question',
        name: 'What sponsorship tiers are available for SANKALP 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SANKALP 2027 offers four primary sponsorship tiers: Platinum Sponsor (INR 300,000 + GST), Gold Sponsor (INR 200,000 + GST), Silver Sponsor (INR 100,000 + GST), and Bronze / Associate Sponsor (INR 50,000 + GST), along with custom partnership packages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do organizations apply for sponsorship?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Organizations can download the official Sponsorship Proposal PDF from the portal or contact the conference secretariat directly at sankalp@jklu.edu.in for customized agreements.',
        },
      },
    ],
  };

  const eventSponsorshipSchema = {
    '@context': 'https://schema.org',
    '@type': 'AcademicEvent',
    name: 'JKLU SANKALP 2027 Sponsorship Program',
    url: 'https://sankalp.jklu.edu.in/why-sponsor-us',
    description: 'Corporate and institutional partnership program for the International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction.',
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'JK Lakshmipat University, Jaipur',
      url: 'https://jklu.edu.in',
    },
    location: {
      '@type': 'Place',
      name: 'JK Lakshmipat University',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Mahindra SEZ, Ajmer Road',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302026',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={eventSponsorshipSchema} />
      <WhySponsorUsClient />
    </>
  );
}
