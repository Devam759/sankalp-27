import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Contact Us | JKLU SANKALP 2027" },
  description: "Official contact directory for JKLU SANKALP 2027 International Conference. Get in touch with conference chairs, track chairs, registration, publication, and sponsorship committees at JKLU Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/contact',
  },
  keywords: [
    "Contact JKLU SANKALP 2027",
    "JKLU SANKALP 2027 Helpdesk",
    "JKLU Conference Email",
    "Registration Committee Contact Sankalp"
  ],
  openGraph: {
    title: "Contact Us | JKLU SANKALP 2027",
    description: "Contact organizing heads, track chairs, and sub-committees for JKLU SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/contact',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: "JKLU SANKALP 2027 Contact Directory",
    url: 'https://sankalp.jklu.edu.in/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'JK Lakshmipat University - JKLU SANKALP 2027 Secretariat',
      email: 'sankalp@jklu.edu.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mahapura Road, Near Mahindra SEZ, Ajmer Road',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302026',
        addressCountry: 'IN',
      },
    },
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
        name: 'Contact',
        item: 'https://sankalp.jklu.edu.in/contact',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, contactPageSchema]} />
      <ContactClient />
    </>
  );
}
