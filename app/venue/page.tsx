import type { Metadata } from 'next';
import VenueClient from './VenueClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Venue & Travel Guide | JKLU SANKALP 2027" },
  description: "Conference venue for JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur. Includes travel guide by air, train, and road, delegate hotel recommendations, and city attractions.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/venue',
  },
  keywords: [
    "JKLU SANKALP 2027 Venue",
    "JKLU Venue",
    "JK Lakshmipat University Address",
    "Sankalp Conference Venue Jaipur",
    "Hotels near JKLU Jaipur",
    "Jaipur Travel Guide Conference Delegates",
    "conference venue jaipur",
    "JKLU campus address",
    "JKLU location map",
    "how to reach JKLU Jaipur",
    "hotels near JK Lakshmipat University",
    "jaipur conference venue rajasthan",
    "conference accommodation jaipur",
    "jaipur airport to JKLU",
    "jaipur junction to JKLU",
    "conference travel guide jaipur",
    "places to visit jaipur conference",
    "JKLU Mahindra World City Jaipur"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "Venue & Travel Guide | JKLU SANKALP 2027",
    description: "Location, map, navigation, delegate accommodation, and travel tips for JKLU SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/venue',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'JK Lakshmipat University Campus - Official Venue for SANKALP 2027 Conference Jaipur',
      },
    ],
  },
};

export default function VenuePage() {
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
        name: 'Venue',
        item: 'https://sankalp.jklu.edu.in/venue',
      },
    ],
  };

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'JK Lakshmipat University',
    alternateName: ['JKLU', 'JK Lakshmipat University Jaipur'],
    url: 'https://sankalp.jklu.edu.in/venue',
    telephone: '+91-141-7107500',
    image: ['https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahapura Road, Near Mahindra SEZ, Ajmer Road',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302026',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.836603',
      longitude: '75.647729',
    },
    hasMap: 'https://maps.app.goo.gl/Br41eEjiNpgZaDjA9',
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, placeSchema]} />
      <VenueClient />
    </>
  );
}
