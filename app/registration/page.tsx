import type { Metadata } from 'next';
import RegistrationClient from './RegistrationClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Registration & Fees | JKLU SANKALP 2027" },
  description: "Register for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur. View pricing for student, academic, industry, and international participants.",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "Registration & Fees | JKLU SANKALP 2027",
    description: "Complete your online registration for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur.",
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
