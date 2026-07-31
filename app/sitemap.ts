import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sankalp.jklu.edu.in';
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/call-for-papers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/sessions', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/registration', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/committee', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/venue', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sponsors', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tech-team', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/refund-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/shipping-policy', priority: 0.5, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
