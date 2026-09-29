import type { Metadata } from 'next';
import FaqClient from './FaqClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "FAQ | JKLU SANKALP 2027" },
  description: "Frequently asked questions about JKLU SANKALP 2027 — paper submissions, registration fees, travel to JKLU Jaipur, parking, Wi-Fi, and accommodation.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/faq',
  },
  keywords: [
    "JKLU SANKALP 2027 FAQ",
    "Sankalp FAQ",
    "JKLU Conference FAQ",
    "Sankalp Paper Submission Queries",
    "Sankalp Registration Questions",
    "JKLU Campus Facilities FAQ",
    "conference FAQ jaipur",
    "how to submit paper sankalp",
    "sankalp conference dates 2027",
    "conference registration help",
    "accommodation FAQ conference jaipur",
    "parking WiFi conference JKLU"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
  openGraph: {
    title: "FAQ | JKLU SANKALP 2027",
    description: "Answers to key queries about registrations, venue facilities, travel, and accommodation for JKLU SANKALP 2027.",
    url: 'https://sankalp.jklu.edu.in/faq',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - JKLU SANKALP 2027 International Conference Jaipur',
      },
    ],
  },
};

export interface FaqItem {
  q: string;
  a: string;
  category: 'registration' | 'paper' | 'venue';
}

export const FAQS_DATA: FaqItem[] = [
  // Registration & Fees
  {
    category: 'registration',
    q: 'Can I register for SANKALP 2027 on-site?',
    a: 'On-site registration is subject to seat availability. We strongly recommend registering online in advance to secure your spot and take advantage of early bird terms.'
  },
  {
    category: 'registration',
    q: 'What does the registration fee include?',
    a: 'The registration fee covers conference materials, access to technical sessions, a conference kit, proceedings publication, participation certificates, and networking opportunities including lunches and tea breaks.'
  },
  {
    category: 'registration',
    q: 'How do I pay the registration fee?',
    a: 'Payment can be made online through our secure payment gateway (Cashfree PG) supporting UPI, Net Banking, Credit Cards, Debit Cards, and mobile wallets. Payment instructions are provided during online registration.'
  },
  {
    category: 'registration',
    q: 'Can I transfer my registration to a friend or colleague if unable to attend?',
    a: 'Yes, registration transfer to a co-author or colleague is permitted, subject to prior written approval from the conference organizing committee.'
  },
  {
    category: 'registration',
    q: 'Can I get an invoice/receipt for the registration fee?',
    a: 'Yes. An official payment receipt and tax invoice will be issued automatically according to the billing details submitted during registration.'
  },
  {
    category: 'registration',
    q: 'I made the payment but did not receive a confirmation. What should I do?',
    a: 'Please do not make another payment immediately. Email your payment transaction/reference number and proof of payment to the registration team at sankalp@jklu.edu.in for verification.'
  },
  {
    category: 'registration',
    q: 'Is the registration fee refundable?',
    a: 'Registration fees are generally non-refundable. However, in exceptional emergency situations, requests may be reviewed upon prior approval from the organizing committee.'
  },
  {
    category: 'registration',
    q: 'What should I do if I am registering after the deadline?',
    a: 'If you are registering after the published deadline, please contact the organizing coordinator promptly via email or phone for assistance.'
  },

  // Paper & Author Queries
  {
    category: 'paper',
    q: 'Is registration mandatory for paper acceptance and proceedings publication?',
    a: 'Yes. At least one author of an accepted paper must complete registration within the specified deadline for the paper to be published and included in the presentation schedule.'
  },
  {
    category: 'paper',
    q: 'Who should register for an accepted paper?',
    a: 'At least one author must register and present the paper. The registered author should be the person attending and presenting the paper unless prior approval is obtained.'
  },
  {
    category: 'paper',
    q: 'Can one author present more than one paper?',
    a: 'Yes, subject to the conference registration and presentation policy. You must complete registration for each accepted paper.'
  },
  {
    category: 'paper',
    q: 'Does one registration allow multiple co-authors to attend?',
    a: 'Each standard author registration allows only one author or co-author to attend the conference. Co-authors wishing to attend should register as co-authors/delegates.'
  },
  {
    category: 'paper',
    q: 'Can modifications be made to the paper after final submission?',
    a: 'Once the final camera-ready submission date has passed, no further modifications to paper text, titles, or author details will be accepted.'
  },

  // Venue & Logistics
  {
    category: 'venue',
    q: 'Where is the conference venue located?',
    a: 'JKLU SANKALP 2027 is hosted at JK Lakshmipat University (JKLU), near Mahindra SEZ on Ajmer Road, Jaipur, Rajasthan 302026, India. The campus is well-connected and easily accessible via pre-paid airport taxis and ride-sharing services.'
  },
  {
    category: 'venue',
    q: 'Is parking available on campus?',
    a: 'Yes, secure and spacious parking zones are available on campus free of charge for all registered delegates, speakers, and attendees throughout the conference.'
  },
  {
    category: 'venue',
    q: 'Is campus-wide Wi-Fi available?',
    a: 'Complimentary high-speed Wi-Fi access will be provided to all registered attendees across all academic halls, seminar rooms, and dining areas on campus.'
  },
  {
    category: 'venue',
    q: 'Is the venue wheelchair accessible?',
    a: 'Yes, the JKLU campus features fully wheelchair-accessible pathways, entry ramps, elevators in all multi-story academic blocks, and dedicated assistance layout.'
  },
  {
    category: 'venue',
    q: 'How can I reach the venue from Jaipur Airport?',
    a: 'Jaipur International Airport (JAI) is approximately 25 km (around 45 minutes) from the venue. Pre-paid airport taxis, Uber, and Ola cabs are readily available at the terminal exit.'
  },
  {
    category: 'venue',
    q: 'Will food and refreshments be available during the conference?',
    a: 'Yes, complimentary catered lunches, coffee/tea, and evening refreshments will be served during designated networking breaks to all registered delegates.'
  },
  {
    category: 'venue',
    q: 'Who should I contact for travel and accommodation assistance?',
    a: 'For travel, transit, or accommodation support, please contact our logistics helpdesk at sankalp@jklu.edu.in or visit the assistance counter in the main academic lobby.'
  }
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
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
        name: 'FAQ',
        item: 'https://sankalp.jklu.edu.in/faq',
      },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema]} />
      <FaqClient faqs={FAQS_DATA} />
    </>
  );
}

