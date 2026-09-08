/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['172.16.62.133'],
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    // Reduces bundle size by tree-shaking large packages — fixes the "unminified JS" warning
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    qualities: [75, 85, 90, 95, 100],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sankalp.jklu.edu.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/sankalp-27-assets/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.sankalp.jklu.edu.in',
          },
        ],
        destination: 'https://sankalp.jklu.edu.in/:path*',
        permanent: true,
      },
      {
        source: '/submission',
        destination: '/call-for-papers',
        permanent: true,
      },
      {
        source: '/submit-paper',
        destination: '/call-for-papers',
        permanent: true,
      },
      {
        source: '/submissions',
        destination: '/call-for-papers',
        permanent: true,
      },
      {
        source: '/schedule',
        destination: '/sessions',
        permanent: true,
      },
      {
        source: '/speakers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/venue',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/refund',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/shipping-policy',
        permanent: true,
      },
      {
        source: '/check-in',
        destination: '/scanner',
        permanent: true,
      },
      {
        source: '/docs/SANKALP_2027_Sponsorship_Brochure.pdf',
        destination: '/docs/sponsorship-proposal.pdf',
        permanent: true,
      },
      {
        source: '/JKLU%20Sankalp%20Brochure.pdf',
        destination: '/docs/conference-brochure.pdf',
        permanent: true,
      },
      {
        source: '/docs/Guidelines.pdf',
        destination: '/docs/author-guidelines.pdf',
        permanent: true,
      },
      {
        source: '/docs/guidelines.pdf',
        destination: '/docs/author-guidelines.pdf',
        permanent: true,
      },
      {
        source: '/Firefly.jpg',
        destination: '/images/firefly.jpg',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/sessions',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // ── Cache public assets for production ──
      // Note: /_next/static/ is handled automatically by Next.js in production
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/Images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/logos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/docs/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // ── Security & general headers for all routes ──
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cashfree.com https://apis.google.com https://www.gstatic.com https://www.google.com https://*.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.recaptcha.net https://*.recaptcha.net https://recaptcha.google.com https://va.vercel-scripts.com; connect-src 'self' https://*.cashfree.com https://*.googleapis.com https://apis.google.com https://*.firebaseio.com wss://*.firebaseio.com https://www.google.com https://*.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.recaptcha.net https://*.recaptcha.net https://recaptcha.google.com https://va.vercel-scripts.com; frame-src 'self' https://*.cashfree.com https://*.google.com https://*.google.co.in https://www.google.com https://www.recaptcha.net https://*.recaptcha.net https://recaptcha.google.com https://sankalp-27.firebaseapp.com; img-src 'self' data: https: blob:; media-src 'self' blob: https://storage.googleapis.com https://res.cloudinary.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; object-src 'none';"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), geolocation=(), microphone=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;