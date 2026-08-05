import type { Metadata } from 'next';
import RegistrationClient from './RegistrationClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Registration & Fees | JKLU SANKALP 2027 | JKLU",
  description: "Register online for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur. Transparent pricing tiers for student authors, academicians, industry delegates, and international participants.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/registration',
  },
  keywords: [
    "JKLU SANKALP 2027 Registration",
    "Sankalp 2027 Registration",
    "Conference Registration Fees",
    "Author Registration JKLU",
    "Academic Conference Fees Jaipur",
    "Sankalp Cashfree Registration"
  ],
  openGraph: {
    title: "Registration & Fee Structure - JKLU SANKALP 2027 | JKLU Jaipur",
    description: "Complete your online registration for the JKLU SANKALP 2027 International Conference at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/registration',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function RegistrationPage() {
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
        name: 'Registration',
        item: 'https://sankalp.jklu.edu.in/registration',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <RegistrationClient />
    </>
  );
}
