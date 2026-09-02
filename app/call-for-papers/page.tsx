import type { Metadata } from 'next';
import CallForPapersClient from './CallForPapersClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Call for Papers | JKLU SANKALP 2027" },
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
    "JKLU Conference Track Guidelines",
    "call for papers india 2027",
    "call for papers jaipur",
    "call for papers international conference india",
    "submit research paper conference india",
    "submit paper AI conference 2027",
    "call for papers data science 2027",
    "Scopus indexed call for papers jaipur",
    "Springer LNCS call for papers india",
    "call for papers VLSI conference",
    "call for papers machine learning",
    "call for papers IoT conference india",
    "call for papers smart healthcare",
    "call for papers high performance computing",
    "paper submission deadline conference 2027",
    "research paper submission jaipur",
    "best conference to publish paper india 2027",
    "free paper publication conference india"
  ],
  openGraph: {
    title: "Call for Papers | JKLU SANKALP 2027",
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
