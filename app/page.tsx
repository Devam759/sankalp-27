import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "SANKALP 2027 | SANKALP '27 | International Conference | JKLU Jaipur",
  description: "Official website for SANKALP 2027 (SANKALP '27) – International Conference on Sustainable AI, Data Science & Next-Gen Knowledge, Automation, Learning & Prediction, organized by IET, JK Lakshmipat University, Jaipur.",
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
    "iet jklu sankalp"
  ],
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  openGraph: {
    title: "SANKALP 2027 (SANKALP '27) | International Conference | JKLU Jaipur",
    description: "Join international researchers, academics, and industry experts at JK Lakshmipat University for SANKALP 2027.",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "SANKALP 2027 (SANKALP '27) International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://sankalp.jklu.edu.in/Images/jklu.jpg',
        width: 1200,
        height: 630,
        alt: 'SANKALP 2027 - JK Lakshmipat University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SANKALP 2027 (SANKALP '27) | JK Lakshmipat University, Jaipur",
    description: "International Conference on Sustainable AI & Next-Gen Knowledge at JKLU Jaipur.",
    images: ['https://sankalp.jklu.edu.in/Images/jklu.jpg'],
  },
};

export default function Page() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SANKALP 2027',
    alternateName: [
      'sankalp',
      'sankalp27',
      'sankalp 2027',
      "sankalp '27",
      'sankalp jklu',
      'sankalp conference',
      'sankalp jklu conference',
      'sankalp 2027 jklu'
    ],
    url: 'https://sankalp.jklu.edu.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sankalp.jklu.edu.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const universitySchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'JK Lakshmipat University',
    alternateName: ['JKLU', 'JK Lakshmipat University Jaipur'],
    url: 'https://jklu.edu.in',
    logo: 'https://sankalp.jklu.edu.in/Images/jklu.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahapura Road, Near Mahindra World City, Ajmer Road',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302026',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/jklakshmipatuniversity/',
      'https://twitter.com/jklu_jaipur',
      'https://www.linkedin.com/school/jklakshmipatuniversity/',
      'https://www.instagram.com/jklu_jaipur/',
    ],
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'AcademicEvent',
    name: "SANKALP 2027 - International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction",
    alternateName: [
      "sankalp",
      "sankalp27",
      "sankalp 2027",
      "sankalp '27",
      "sankalp jklu",
      "sankalp conference",
      "Sankalp 2027 JKLU"
    ],
    startDate: '2027-02-19T09:00:00+05:30',
    endDate: '2027-02-20T17:00:00+05:30',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'JK Lakshmipat University Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mahapura Road, Ajmer Road',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302026',
        addressCountry: 'IN',
      },
    },
    image: ['https://sankalp.jklu.edu.in/Images/jklu.jpg'],
    description: "Premier international multidisciplinary conference organized by the Institute of Engineering & Technology (IET), JK Lakshmipat University, Jaipur.",
    organizer: {
      '@type': 'Organization',
      name: 'Institute of Engineering & Technology (IET), JK Lakshmipat University',
      url: 'https://jklu.edu.in',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Indian Author Registration',
        price: '4000',
        priceCurrency: 'INR',
        url: 'https://sankalp.jklu.edu.in/registration',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'International Author Registration',
        price: '150',
        priceCurrency: 'USD',
        url: 'https://sankalp.jklu.edu.in/registration',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[websiteSchema, universitySchema, eventSchema]} />
      <HomeClient />
    </>
  );
}
