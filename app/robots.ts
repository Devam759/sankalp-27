import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sankalp.jklu.edu.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/scanner',
          '/scanner/*',
          '/login',
          '/login/*',
          '/check-in',
          '/check-in/*',
          '/api/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/scanner',
          '/scanner/*',
          '/login',
          '/login/*',
          '/check-in',
          '/check-in/*',
          '/api/*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/scanner',
          '/scanner/*',
          '/login',
          '/login/*',
          '/check-in',
          '/check-in/*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
