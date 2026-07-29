import type { Metadata } from 'next';
import CommitteeClient from './CommitteeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Organizing Committee & Advisory Board | Sankalp '27 Conference",
  description: "Meet the leadership, patrons, program chairs, and international/national advisory boards of Sankalp '27 at JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/committee',
  },
  keywords: [
    "Sankalp Committee",
    "Sankalp Advisory Board",
    "JKLU Conference Leadership",
    "Technical Program Committee Sankalp",
    "IET JKLU Faculty"
  ],
  openGraph: {
    title: "Organizing Committee & Advisory Board - SANKALP '27",
    description: "Distinguished academics and institutional leaders steering Sankalp 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/committee',
    siteName: "Sankalp '27 Website",
    type: 'website',
  },
};

export default function CommitteePage() {
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
        name: 'Committee',
        item: 'https://sankalp.jklu.edu.in/committee',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CommitteeClient />
    </>
  );
}
