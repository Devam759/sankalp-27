import type { Metadata } from 'next';
import CommitteeClient from './CommitteeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Organizing Committee & Leadership | SANKALP '27 JKLU",
  description: "Meet the leadership, patrons, conference chairs, program chairs, and international/national advisory boards of SANKALP 2027 at JK Lakshmipat University, Jaipur.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/committee',
  },
  keywords: [
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
    "Dr. Tapas Kumar",
    "Tapas Kumar JKLU",
    "Dr. Sonali Vyas",
    "Sonali Vyas JKLU",
    "Dr. S. Taruna",
    "Prof. S. Taruna",
    "S Taruna",
    "S Taruna JKLU",
    "Dr. S. Taruna JKLU",
    "Dr. Taruna Sunil",
    "Taruna Sunil",
    "Dr. Amit Kumar Sinhal",
    "Amit Sinhal JKLU",
    "Dr. Devika Kataria",
    "Devika Kataria JKLU",
    "Dr. Umesh Gupta",
    "Umesh Gupta JKLU"
  ],
  openGraph: {
    title: "Organizing Committee & Institutional Leadership | SANKALP '27",
    description: "Distinguished academics and institutional leaders steering SANKALP 2027 at JK Lakshmipat University.",
    url: 'https://sankalp.jklu.edu.in/committee',
    siteName: "SANKALP '27 Website",
    type: 'website',
    images: [
      {
        url: 'https://sankalp.jklu.edu.in/Images/committee/Bharat_Hari_Singhania.webp',
        width: 600,
        height: 600,
        alt: 'Mr. Bharat Hari Singhania - Chief Patron SANKALP 2027 JKLU',
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
      alternateName: ['Bharat Hari Singhania', 'Chancellor Bharat Hari Singhania'],
      jobTitle: 'Chancellor & Chief Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Bharat_Hari_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Raghupati Singhania',
      alternateName: ['Raghupati Singhania', 'Pro Chancellor Raghupati Singhania'],
      jobTitle: 'Pro Chancellor & Chief Co-Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Raghupati_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mr. Harsh Pati Singhania',
      alternateName: ['Harsh Pati Singhania', 'Pro Chancellor Harsh Pati Singhania'],
      jobTitle: 'Pro Chancellor & Chief Co-Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/Harsh_Pati_Singhania.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Prof. Vijaysekhar Chellaboina',
      alternateName: ['Vijaysekhar Chellaboina', 'VC Vijaysekhar Chellaboina'],
      jobTitle: 'Vice Chancellor & Patron',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/vc.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Tapas Kumar',
      alternateName: ['Tapas Kumar', 'Dean Tapas Kumar'],
      jobTitle: 'Dean IET & Conference Chair',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/tapas_kumar.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Sonali Vyas',
      alternateName: ['Sonali Vyas', 'Dr Sonali Vyas JKLU'],
      jobTitle: 'Head Centre for Global Learning & Conference Convener',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/sonali_vyas.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. S. Taruna',
      alternateName: ['Prof. S. Taruna', 'S Taruna', 'S. Taruna', 'Dr. Taruna Sunil', 'Taruna Sunil', 'Dr. S Taruna JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/taruna_sunil.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Amit Kumar Sinhal',
      alternateName: ['Amit Kumar Sinhal', 'Dr. Amit Sinhal', 'Amit Sinhal JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/amit_sinhal.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Devika Kataria',
      alternateName: ['Devika Kataria', 'Dr Devika Kataria JKLU'],
      jobTitle: 'Program Chair & Professor',
      worksFor: { '@type': 'EducationalOrganization', name: 'JK Lakshmipat University', url: 'https://jklu.edu.in' },
      image: 'https://sankalp.jklu.edu.in/Images/committee/devika_kataria.webp',
      url: 'https://sankalp.jklu.edu.in/committee',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dr. Umesh Gupta',
      alternateName: ['Umesh Gupta', 'Dr Umesh Gupta JKLU'],
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
