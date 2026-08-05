import { Metadata } from 'next';
import SessionsClient from './SessionsClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Conference Tracks & Sessions | JKLU SANKALP 2027 | JKLU',
  description: 'Explore the 7 multidisciplinary tracks and session themes for JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur. Covering Sustainable AI, Data Science, High-Performance Computing, Smart Healthcare, and semiconductor engineering.',
  keywords: [
    'JKLU SANKALP 2027 tracks',
    'SANKALP 2027 tracks',
    'conference sessions',
    'Sustainable AI tracks',
    'Data Science Generative AI',
    'High Performance Computing tracks',
    'Smart Healthcare AI',
    'VLSI semiconductor sessions',
    'JKLU conference tracks'
  ],
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/sessions',
  },
  openGraph: {
    title: 'Conference Tracks & Sessions | JKLU SANKALP 2027',
    description: 'Explore the 7 multidisciplinary tracks and session themes for JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur.',
    url: 'https://sankalp.jklu.edu.in/sessions',
    siteName: 'JKLU SANKALP 2027',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conference Tracks & Sessions | JKLU SANKALP 2027',
    description: 'Explore the 7 multidisciplinary tracks and session themes for JKLU SANKALP 2027 at JK Lakshmipat University, Jaipur.',
  },
};

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
      name: 'Conference Tracks & Sessions',
      item: 'https://sankalp.jklu.edu.in/sessions',
    },
  ],
};

export default function SessionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SessionsClient />
    </>
  );
}
