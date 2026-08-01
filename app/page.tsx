import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "SANKALP 2027 | International Conference | JKLU Jaipur",
  description: "Join SANKALP 2027 at JKLU Jaipur—the premier International Conference on Sustainable AI, Data Science & Next-Gen Tech. Submit your research papers today!",
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
    "iet jklu sankalp",
    "Dr. S. Taruna",
    "Prof. S. Taruna",
    "S Taruna",
    "S Taruna JKLU",
    "Dr. S. Taruna JKLU",
    "Dr. Taruna Sunil",
    "Taruna Sunil"
  ],
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in',
  },
  openGraph: {
    title: "SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for SANKALP 2027 on Sustainable AI, Data Science & Next-Gen Tech. Submit research papers today!",
    url: 'https://sankalp.jklu.edu.in',
    siteName: "SANKALP 2027 International Conference",
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
    title: "SANKALP 2027 | International Conference | JKLU Jaipur",
    description: "Join premier researchers at JKLU Jaipur for SANKALP 2027 on Sustainable AI & Next-Gen Knowledge.",
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
