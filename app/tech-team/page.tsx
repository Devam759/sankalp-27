import type { Metadata } from 'next';
import TechTeamClient from './TechTeamClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Website Development Team | Devam Gupta & Team | JKLU SANKALP 2027",
  description: "Meet the website development team behind the JKLU SANKALP 2027 Web Portal at JK Lakshmipat University, Jaipur.",
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
    "JKLU SANKALP 2027 Website Development Team",
    "Website Development Team",
    "SANKALP Web Development Team",
    "JKLU Web Developers",
    "JKLU Website Development Team"
  ],
  openGraph: {
    title: "Website Development Team - JKLU SANKALP 2027 | JKLU Jaipur",
    description: "Website development team credits for the official web portal of JKLU SANKALP 2027 International Conference.",
    url: 'https://sankalp.jklu.edu.in/tech-team',
    siteName: "JKLU SANKALP 2027 Website",
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
        name: 'Website Development Team',
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
      affiliation: { '@type': 'Organization', name: 'JKLU SANKALP 2027 Web Portal', url: 'https://sankalp.jklu.edu.in' }
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
