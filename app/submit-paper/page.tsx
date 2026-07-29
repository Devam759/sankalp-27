import type { Metadata } from 'next';
import SubmitPaperClient from './SubmitPaperClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Submit Research Paper Portal | Sankalp '27 | JKLU",
  description: "Online paper submission portal for Sankalp '27 International Conference at JK Lakshmipat University. Submit manuscript for peer review and publication in Springer LNCS / Scopus indexed proceedings.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/submit-paper',
  },
  keywords: [
    "Sankalp Paper Submission",
    "Submit Research Paper JKLU",
    "Springer LNCS Paper Portal",
    "Sustainable AI Submission 2027"
  ],
  openGraph: {
    title: "Paper Submission Portal - SANKALP '27",
    description: "Submit your research manuscript to the Sankalp 2027 International Conference peer-review portal at JKLU Jaipur.",
    url: 'https://sankalp.jklu.edu.in/submit-paper',
    siteName: "Sankalp '27 Website",
    type: 'website',
  },
};

export default function SubmitPaperPage() {
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
        name: 'Submit Paper',
        item: 'https://sankalp.jklu.edu.in/submit-paper',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SubmitPaperClient />
    </>
  );
}
