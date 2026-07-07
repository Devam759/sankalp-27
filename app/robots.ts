import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/scanner',
          '/scanner/',
          '/login',
          '/login/',
          '/check-in',
          '/check-in/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin',
          '/scanner',
          '/login',
          '/check-in',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://sankalp.jklu.edu.in/sitemap.xml',
    host: 'https://sankalp.jklu.edu.in',
  };
}
