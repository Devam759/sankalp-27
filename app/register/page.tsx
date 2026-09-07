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
    "Sankalp Cashfree Checkout",
    "register for conference jaipur",
    "conference registration form india",
    "online registration international conference",
    "register paper presentation 2027",
    "conference payment checkout india"
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
        name: 'Register Online',
        item: 'https://sankalp.jklu.edu.in/register',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I register for JKLU SANKALP 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select your registration category (Author, Academician, Student/Research Scholar, or Industry Professional), fill in attendee details, and complete the payment through the secure Cashfree gateway.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment modes are accepted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The portal supports UPI, Net Banking, Credit Cards, Debit Cards, and leading mobile wallets through Cashfree Payments.',
        },
      },
      {
        '@type': 'Question',
        name: 'When will I receive my registration confirmation and badge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Immediately upon successful payment, an automated confirmation email containing your official tax receipt, registration ID, and digital check-in QR code will be delivered to your registered email address.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cancellation and refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Registration cancellations and refund terms are subject to the official JKLU SANKALP refund policy published at https://sankalp.jklu.edu.in/refund-policy.',
        },
      },
    ],
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'AcademicEvent',
    name: 'JKLU SANKALP 2027 Registration',
    url: 'https://sankalp.jklu.edu.in/register',
    description: 'Online registration and payment portal for delegates and authors presenting at JKLU SANKALP 2027.',
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'JK Lakshmipat University, Jaipur',
      url: 'https://jklu.edu.in',
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={eventSchema} />
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
