import { MetadataRoute } from 'next';
import { categories } from '@/data/keywords';
import { cities } from '@/data/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://weddingdirectoryflorida.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Category pages
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // City pages
  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/city/${city.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Category + City combination pages
  const combinationRoutes = categories.flatMap((category) =>
    cities.map((city) => ({
      url: `${baseUrl}/category/${category.slug}/${city.name.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))
  );

  return [...staticPages, ...categoryRoutes, ...cityRoutes, ...combinationRoutes];
} 