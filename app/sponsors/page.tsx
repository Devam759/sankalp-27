import type { Metadata } from 'next';
import SponsorsClient from './SponsorsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Sponsors & Partners | JKLU SANKALP 2027" },
  description: "Explore corporate sponsorship packages, partner benefits, and institutional patronage for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur. Platinum, Gold, Silver, and Associate packages available.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/sponsors',
  },
  keywords: [
    "JKLU SANKALP 2027 Sponsors",
    "Sankalp Sponsors",
    "Conference Sponsorship Opportunities",
    "JKLU Industry Partnerships",
    "AI Conference Sponsors India",
    "sponsor conference jaipur",
    "sponsor international conference india",
    "conference sponsorship packages india",
    "sponsor academic conference 2027",
    "conference branding opportunities jaipur",
    "technology conference sponsor india",
    "exhibition stalls conference jaipur",
    "Why Sponsor JKLU SANKALP 2027",
    "Sankalp 2027 Sponsorship Packages",
    "Sustainable AI Sponsorship",
    "sponsorship prospectus sankalp 2027"
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
    images: [
      {
        url: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'Sponsorship & Partnerships - JKLU SANKALP 2027 International Conference Jaipur',
      },
    ],
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
        name: 'Sponsors & Partnerships',
        item: 'https://sankalp.jklu.edu.in/sponsors',
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
    url: 'https://sankalp.jklu.edu.in/sponsors',
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
      <SponsorsClient />
    </>
  );
}
