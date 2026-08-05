import type { Metadata } from 'next';
import CallForPapersClient from './CallForPapersClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Call for Papers | JKLU SANKALP 2027 | JKLU",
  description: "Submit your original research to JKLU SANKALP 2027 International Conference at JKLU Jaipur. Tracks include Sustainable AI, Data Science, Smart Healthcare, VLSI, and HPC. Springer LNCS Series / Scopus indexing opportunities.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/call-for-papers',
  },
  keywords: [
    "Call for Papers 2027",
    "JKLU SANKALP 2027 Call for Papers",
    "Sankalp Call for Papers",
    "Springer LNCS Conference",
    "Scopus Indexed Conference Call for Papers",
    "Sustainable AI Research Papers",
    "Data Science Conference Submission",
    "JKLU Conference Track Guidelines"
  ],
  openGraph: {
    title: "Call for Papers - JKLU SANKALP 2027 | JKLU Jaipur",
    description: "Submit original research papers in Sustainable AI, Data Science, and Emerging Tech for JKLU SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/call-for-papers',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
  },
};

export default function CallForPapersPage() {
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
        name: 'Call for Papers',
        item: 'https://sankalp.jklu.edu.in/call-for-papers',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CallForPapersClient />
    </>
  );
}
