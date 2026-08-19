import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterClient from '@/app/register/RegisterClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Register for Conference | JKLU SANKALP 2027" },
  description: "Complete your online registration for JKLU SANKALP 2027 International Conference. Secure payment checkout via Cashfree PG with instant ticket generation.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/register',
  },
  keywords: [
    "JKLU SANKALP 2027 Registration Form",
    "Register SANKALP 2027",
    "Conference Registration Checkout",
    "Author Registration Online",
    "Sankalp Cashfree Checkout"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "Register for Conference | JKLU SANKALP 2027",
    description: "Complete your online registration for JKLU SANKALP 2027 International Conference at JK Lakshmipat University, Jaipur.",
    url: 'https://sankalp.jklu.edu.in/register',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function RegisterPage() {
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
        name: 'Registration Fees',
        item: 'https://sankalp.jklu.edu.in/registration',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Checkout Form',
        item: 'https://sankalp.jklu.edu.in/register',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Suspense fallback={
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <RegisterClient />
      </Suspense>
    </>
  );
}
