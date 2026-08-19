import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "JKLU SANKALP 2027 | International Conference | JK Lakshmipat University, Jaipur" },
  description: "JKLU SANKALP 2027 - the premier International Conference on Sustainable AI, Data Science & Next-Gen Tech at JK Lakshmipat University, Jaipur. Submit papers and register now.",
  keywords: [
    "sankalp",
    "sankalp 2027",
    "sankalp27",
    "sankalp '27",
    "sankalp jklu",
    "jklu sankalp",
    "sankalp conference",
    "sankalp jklu conference",
    "sankalp 2027 jklu",
    "jklu sankalp 2027",
    "sankalp jaipur",
    "sankalp international conference",
    "iet jklu sankalp",
    "sankalp.jklu.edu.in",
    "JKLU SANKALP",
    "JK Lakshmipat University Conference",
    "international conference jaipur 2027",
    "sustainable AI conference india",
    "data science conference jaipur"
  ],
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "JKLU SANKALP 2027 | International Conference | JK Lakshmipat University",
    description: "SANKALP 2027 – The official JKLU SANKALP International Conference on Sustainable AI, Data Science & Next-Gen Tech at JK Lakshmipat University, Jaipur.",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "JKLU SANKALP 2027 International Conference",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://sankalp.jklu.edu.inhttps://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'JKLU SANKALP 2027 Conference - JK Lakshmipat University Jaipur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "JKLU SANKALP 2027 | International Conference | JK Lakshmipat University",
    description: "JKLU SANKALP 2027 – Premier international conference on Sustainable AI & Next-Gen Knowledge at JKLU Jaipur.",
    images: ['https://sankalp.jklu.edu.inhttps://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp'],
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
    logo: 'https://sankalp.jklu.edu.inhttps://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
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
    startDate: '2027-03-12T09:00:00+05:30',
    endDate: '2027-03-13T17:00:00+05:30',
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
    image: ['https://sankalp.jklu.edu.inhttps://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp'],
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

  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SANKALP 2027 Site Navigation',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Call for Papers',
        description: 'Submit original research papers for SANKALP 2027.',
        url: 'https://sankalp.jklu.edu.in/call-for-papers',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Sessions & Tracks',
        description: 'Explore conference tracks, keynotes, and presentation sessions.',
        url: 'https://sankalp.jklu.edu.in/sessions',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Registration',
        description: 'Register for SANKALP 2027 conference.',
        url: 'https://sankalp.jklu.edu.in/registration',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Committee',
        description: 'Meet our advisory board and organizing committee.',
        url: 'https://sankalp.jklu.edu.in/committee',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Venue & Location',
        description: 'Location details and travel guide for JKLU Jaipur.',
        url: 'https://sankalp.jklu.edu.in/venue',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 6,
        name: 'Contact Us',
        description: 'Get in touch with SANKALP 2027 organizers.',
        url: 'https://sankalp.jklu.edu.in/contact',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 7,
        name: 'Privacy Policy',
        description: 'SANKALP 2027 privacy policy and data protection terms.',
        url: 'https://sankalp.jklu.edu.in/privacy-policy',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 8,
        name: 'Terms & Conditions',
        description: 'SANKALP 2027 event terms and conditions.',
        url: 'https://sankalp.jklu.edu.in/terms-and-conditions',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[websiteSchema, universitySchema, eventSchema, navigationSchema]} />
      <HomeClient />
    </>
  );
}
