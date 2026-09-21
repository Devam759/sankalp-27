import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "About | JKLU SANKALP 2027" },
  description: "Learn about JKLU SANKALP 2027, organized by the Institute of Engineering & Technology (IET) at JK Lakshmipat University, Jaipur. Explore our multidisciplinary research ecosystem in Sustainable AI and Data Science.",
  keywords: [
    "about sankalp",
    "about sankalp 2027",
    "about JKLU SANKALP",
    "sankalp conference about",
    "JKLU SANKALP 2027 about",
    "JK Lakshmipat University about",
    "JKLU Jaipur university",
    "IET JKLU",
    "Institute of Engineering and Technology JKLU",
    "about conference jaipur",
    "about international conference jaipur 2027",
    "JKLU research ecosystem",
    "multidisciplinary research conference jaipur",
    "sustainable AI research jaipur",
    "data science research JKLU"
  ],
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/about',
  },
  openGraph: {
    title: "About | JKLU SANKALP 2027",
    description: "Discover the research ecosystem, host university, and core focus areas of the JKLU SANKALP 2027 International Conference in Jaipur.",
    url: 'https://sankalp.jklu.edu.in/about',
    siteName: "JKLU SANKALP 2027 Website",
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
        width: 1200,
        height: 630,
        alt: 'JK Lakshmipat University Campus - JKLU SANKALP 2027 Host',
      },
    ],
  },
};

export default function AboutPage() {
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
        name: 'About',
        item: 'https://sankalp.jklu.edu.in/about',
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'JK Lakshmipat University',
    alternateName: ['JKLU', 'JK Lakshmipat University Jaipur'],
    url: 'https://jklu.edu.in',
    logo: 'https://res.cloudinary.com/flufexsc/image/upload/f_auto,q_auto/v1788342917/sankalp/logos/jklu_logo_light.png',
    image: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahapura Road, Near Mahindra World City, Ajmer Road',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302026',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/jklakshmipatuniversity/',
      'https://twitter.com/jklu_jaipur',
      'https://www.linkedin.com/school/jklakshmipatuniversity/',
      'https://www.instagram.com/jklu_jaipur/',
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, organizationSchema]} />
      <AboutClient />
    </>
  );
}
