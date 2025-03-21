import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getAllCities } from '@/lib/cities';
import { getAllCategories } from '@/lib/categories';
import { cities } from '@/data/cities';
import { categories } from '@/data/keywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://weddingdirectoryflorida.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // City pages
  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/city/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages for each city
  const categoryRoutes = cities.flatMap((city) =>
    categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...cityRoutes, ...categoryRoutes];
} 