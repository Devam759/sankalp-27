import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sankalp.jklu.edu.in';

  const routes: {
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastModified: Date;
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily', lastModified: new Date('2026-08-14') },
    { path: '/call-for-papers', priority: 0.9, changeFrequency: 'weekly', lastModified: new Date('2026-08-14') },
    { path: '/sessions', priority: 0.9, changeFrequency: 'weekly', lastModified: new Date('2026-08-14') },
    { path: '/registration', priority: 0.9, changeFrequency: 'weekly', lastModified: new Date('2026-08-14') },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/committee', priority: 0.8, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/venue', priority: 0.8, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/sponsors', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly', lastModified: new Date('2026-08-14') },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/credits', priority: 0.6, changeFrequency: 'monthly', lastModified: new Date('2026-08-14') },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly', lastModified: new Date('2026-08-14') },
    { path: '/terms-and-conditions', priority: 0.5, changeFrequency: 'yearly', lastModified: new Date('2026-08-14') },
    { path: '/refund-policy', priority: 0.5, changeFrequency: 'yearly', lastModified: new Date('2026-08-14') },
    { path: '/shipping-policy', priority: 0.5, changeFrequency: 'yearly', lastModified: new Date('2026-08-14') },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

