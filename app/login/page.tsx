import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: "Management Login | JKLU SANKALP 2027",
  description: "Authorized management and administrative access portal for JKLU SANKALP 2027.",
  alternates: {
    canonical: 'https://sankalp.jklu.edu.in/login',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
