import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Sankalp '27 | International Conference on Sustainable AI | JK Lakshmipat University",
  description: "Official site for Sankalp '27 – International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction, organized by IET, JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  openGraph: {
    title: "Sankalp '27 | International Conference | JKLU Jaipur",
    description: "Join international researchers, academics, and industry experts at JK Lakshmipat University for Sankalp 2027.",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "Sankalp '27 International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://sankalp.jklu.edu.in/Images/jklu.jpg',
        width: 1200,
        height: 630,
        alt: 'Sankalp 2027 - JK Lakshmipat University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sankalp '27 | JK Lakshmipat University, Jaipur",
    description: "International Conference on Sustainable AI & Next-Gen Knowledge at JKLU Jaipur.",
    images: ['https://sankalp.jklu.edu.in/Images/jklu.jpg'],
  },
};

export default function Page() {
  const universitySchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'JK Lakshmipat University',
    alternateName: 'JKLU',
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
    name: "Sankalp '27 - International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction",
    alternateName: "Sankalp 2027",
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
      <JsonLd data={[universitySchema, eventSchema]} />
      <HomeClient />
    </>
  );
}
