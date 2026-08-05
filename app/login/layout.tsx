import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login | JKLU SANKALP 2027",
  description: "Secure authentication platform for JKLU SANKALP 2027 administrators and check-in scanners.",
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
