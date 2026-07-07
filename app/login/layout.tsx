import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Secure Login",
  description: "Secure authentication platform for Sankalp '27 administrators, check-in scanners, and feedback organizers.",
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
