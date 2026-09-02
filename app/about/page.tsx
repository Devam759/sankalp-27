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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutClient />
    </>
  );
}
