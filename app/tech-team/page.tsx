import type { Metadata } from 'next';
import TechTeamClient from './TechTeamClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Technical Team Credits | Devam Gupta & Engineering Team | SANKALP '27 JKLU",
  description: "Meet the technical engineering team behind the SANKALP 2027 Web Portal at JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/tech-team',
  },
  keywords: [
    "Devam Gupta",
    "Devam Gupta JKLU",
    "Devam Gupta Developer",
    "Devam Gupta SANKALP",
    "Manant Srivastava",
    "Manant Srivastava JKLU",
    "Pratham Lalwani",
    "Pratham Lalwani JKLU",
    "SANKALP Web Team",
    "JKLU Web Developers",
    "IET JKLU Engineering Team"
  ],
  openGraph: {
    title: "Technical Engineering Team - SANKALP '27 | JKLU Jaipur",
    description: "Engineering team credits for the official web portal of SANKALP 2027 International Conference.",
    url: 'https://sankalp.jklu.edu.in/tech-team',
    siteName: "SANKALP '27 Website",
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

  const techTeamPersons = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Devam Gupta',
      alternateName: ['Devam Gupta JKLU', 'Devam Gupta Developer'],
      jobTitle: 'Team Head & Lead Architect',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      url: 'https://sankalp.jklu.edu.in/tech-team',
      affiliation: { '@type': 'Organization', name: 'SANKALP 2027 Web Portal', url: 'https://sankalp.jklu.edu.in' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Manant Srivastava',
      alternateName: ['Manant Srivastava JKLU', 'Manant JKLU'],
      jobTitle: 'Web Engineer',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      url: 'https://sankalp.jklu.edu.in/tech-team'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Pratham Lalwani',
      alternateName: ['Pratham Lalwani JKLU', 'Pratham JKLU'],
      jobTitle: 'Web Engineer',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      url: 'https://sankalp.jklu.edu.in/tech-team'
    }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema, ...techTeamPersons]} />
      <TechTeamClient />
    </>
  );
}
