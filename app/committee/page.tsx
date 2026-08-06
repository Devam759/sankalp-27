import type { Metadata } from 'next';
import CommitteeClient from './CommitteeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Organizing Committee & Leadership | JKLU SANKALP 2027",
  description: "Meet the leadership, patrons, conference chairs, program chairs, and international/national advisory boards of JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/committee',
  },
  keywords: [
    "JKLU SANKALP 2027 Committee",
    "Sankalp Committee",
    "Sankalp Advisory Board",
    "JKLU Conference Leadership",
    "Technical Program Committee Sankalp",
    "IET JKLU Faculty",
    "Mr. Bharat Hari Singhania",
    "Bharat Hari Singhania",
    "Dr. Raghupati Singhania",
    "Raghupati Singhania",
    "Mr. Harsh Pati Singhania",
    "Harsh Pati Singhania",
    "Prof. Vijaysekhar Chellaboina",
    "Vijaysekhar Chellaboina",
    "Prof. Tapas Kumar",
    "Tapas Kumar JKLU",
    "Prof. Sonali Vyas",
    "Sonali Vyas JKLU",
    "Prof. S. Taruna",
    "S Taruna",
    "S Taruna JKLU",
    "Prof. S. Taruna JKLU",
    "Prof. Taruna Sunil",
    "Taruna Sunil",
    "Prof. Amit Kumar Sinhal",
    "Amit Sinhal JKLU",
    "Prof. Devika Kataria",
    "Devika Kataria JKLU",
    "Prof. Umesh Gupta",
    "Umesh Gupta JKLU"
  ],
  openGraph: {
    title: "Organizing Committee & Institutional Leadership | JKLU SANKALP 2027",
    description: "Distinguished academics and institutional leaders steering JKLU SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/committee',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
    images: [
      {
        url: 'https://sankalp.jklu.edu.in/Images/committee/Bharat_Hari_Singhania.webp',
        width: 600,
        height: 600,
        alt: 'Mr. Bharat Hari Singhania - Chief Patron JKLU SANKALP 2027',
      },
    ],
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

  const personSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mr. Bharat Hari Singhania',
      alternateName: ['Bharat Hari Singhania'],
      jobTitle: 'Chief Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Bharat_Hari_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Raghupati Singhania',
      alternateName: ['Raghupati Singhania'],
      jobTitle: 'Chief Co-Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Raghupati_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mr. Harsh Pati Singhania',
      alternateName: ['Harsh Pati Singhania'],
      jobTitle: 'Chief Co-Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Harsh_Pati_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Vijaysekhar Chellaboina',
      alternateName: ['Vijaysekhar Chellaboina'],
      jobTitle: 'Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/vc.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Tapas Kumar',
      alternateName: ['Tapas Kumar', 'Dean Tapas Kumar'],
      jobTitle: 'Dean IET & Conference Chair',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/tapas_kumar.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Sonali Vyas',
      alternateName: ['Sonali Vyas', 'Prof Sonali Vyas JKLU'],
      jobTitle: 'Head Centre for Global Learning & Conference Convener',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/sonali_vyas.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. S. Taruna',
      alternateName: ['Prof. S. Taruna', 'S Taruna', 'S. Taruna', 'Prof. Taruna Sunil', 'Taruna Sunil', 'Prof. S Taruna JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/taruna_sunil.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Amit Kumar Sinhal',
      alternateName: ['Amit Kumar Sinhal', 'Prof. Amit Sinhal', 'Amit Sinhal JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/amit_sinhal.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Devika Kataria',
      alternateName: ['Devika Kataria', 'Prof Devika Kataria JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/devika_kataria.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Umesh Gupta',
      alternateName: ['Umesh Gupta', 'Prof Umesh Gupta JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/umesh_gupta.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema, ...personSchemas]} />
      <CommitteeClient />
    </>
  );
}
