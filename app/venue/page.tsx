import type { Metadata } from 'next';
import VenueClient from './VenueClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Conference Venue & Travel Guide | JKLU SANKALP 2027 | JKLU Jaipur",
  description: "Explore the conference venue for JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur. Complete travel guide (air, train, road), recommended delegate hotels, and Pink City heritage attractions.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/venue',
  },
  keywords: [
    "JKLU SANKALP 2027 Venue",
    "JKLU Venue",
    "JK Lakshmipat University Address",
    "Sankalp Conference Venue Jaipur",
    "Hotels near JKLU Jaipur",
    "Jaipur Travel Guide Conference Delegates"
  ],
  openGraph: {
    title: "Venue & Travel Guide - JKLU SANKALP 2027 | JKLU Jaipur",
    description: "Location, map, navigation, delegate accommodation, and travel tips for JKLU SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/venue',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
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
