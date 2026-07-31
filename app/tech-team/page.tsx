import type { Metadata } from 'next';
import TechTeamClient from './TechTeamClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Technical Team Credits | SANKALP '27 | JKLU",
  description: "Meet the technical engineering team behind the SANKALP '27 International Conference Web Portal at JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/tech-team',
  },
  openGraph: {
    title: "Technical Team Credits - SANKALP '27 | JKLU Jaipur",
    description: "Engineering team credits for the official web portal of SANKALP 2027 International Conference.",
    url: 'https://sankalp.jklu.edu.in/tech-team',
    siteName: "Sankalp '27 Website",
    type: 'website',
  },
};

export default function TechTeamPage() {
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
        name: 'Technical Team Credits',
        item: 'https://sankalp.jklu.edu.in/tech-team',
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <TechTeamClient />
    </>
  );
}
