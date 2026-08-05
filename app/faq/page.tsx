import type { Metadata } from 'next';
import FaqClient from './FaqClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | JKLU SANKALP 2027 | JKLU",
  description: "Find answers to common questions about JKLU SANKALP 2027 paper submissions, registration fees, travel to JKLU Jaipur, parking, Wi-Fi, and accommodation.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/faq',
  },
  keywords: [
    "JKLU SANKALP 2027 FAQ",
    "Sankalp FAQ",
    "JKLU Conference FAQ",
    "Sankalp Paper Submission Queries",
    "Sankalp Registration Questions",
    "JKLU Campus Facilities FAQ"
  ],
  openGraph: {
    title: "Frequently Asked Questions - JKLU SANKALP 2027",
    description: "Answers to key queries about registrations, venue facilities, travel, and accommodation for JKLU SANKALP 2027.",
    url: 'https://sankalp.jklu.edu.in/faq',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Where is the conference venue located?',
      a: "JKLU SANKALP 2027 is hosted at JK Lakshmipat University (JKLU), near Mahindra SEZ on Ajmer Road, Jaipur, Rajasthan 302026, India. The campus is well-connected and easily accessible via pre-paid airport taxis and ride-sharing services."
    },
    {
      q: 'Is parking available on campus?',
      a: 'Yes, secure and spacious parking zones are available on campus free of charge for all registered delegates, speakers, and attendees throughout the conference.'
    },
    {
      q: 'Is campus-wide Wi-Fi available?',
      a: 'Complimentary high-speed Wi-Fi access will be provided to all registered attendees across all academic halls, seminar rooms, and dining areas on campus.'
    },
    {
      q: 'Is the venue wheelchair accessible?',
      a: 'Yes, the JKLU campus features fully wheelchair-accessible pathways, entry ramps, elevators in all multi-story academic blocks, and dedicated assistance layout.'
    },
    {
      q: 'How can I reach the venue from Jaipur Airport?',
      a: 'Jaipur International Airport (JAI) is approximately 25 km (around 45 minutes) from the venue. Pre-paid airport taxis, Uber, and Ola cabs are readily available at the terminal exit.'
    },
    {
      q: 'Will food and refreshments be available during the conference?',
      a: 'Yes, complimentary catered lunches, coffee/tea, and evening refreshments will be served during designated networking breaks to all registered delegates.'
    },
    {
      q: 'Who should I contact for travel-related assistance?',
      a: "For travel, transit, or accommodation support, please contact our logistics helpdesk at sankalp@jklu.edu.in or visit the assistance counter in the main academic lobby."
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

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
        name: 'FAQ',
        item: 'https://sankalp.jklu.edu.in/faq',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />
      <FaqClient />
    </>
  );
}
