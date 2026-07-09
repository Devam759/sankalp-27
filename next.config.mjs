/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      }
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cashfree.com https://apis.google.com https://www.gstatic.com https://www.google.com https://www.recaptcha.net https://va.vercel-scripts.com; connect-src 'self' https://*.cashfree.com https://*.googleapis.com https://apis.google.com https://*.firebaseio.com wss://*.firebaseio.com https://va.vercel-scripts.com; frame-src 'self' https://*.cashfree.com https://*.google.com https://*.google.co.in https://www.google.com https://www.recaptcha.net https://sankalp-27.firebaseapp.com; img-src 'self' data: https: blob:; media-src 'self' blob: https://storage.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; object-src 'none';"
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
}

export default nextConfig;