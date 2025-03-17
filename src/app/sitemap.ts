import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getAllCities } from '@/lib/cities';
import { getAllCategories } from '@/lib/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Connect to the database
  await connectToDatabase();

  // Get all cities and categories
  const cities = await getAllCities();
  const categories = await getAllCategories();

  // Base URLs
  const baseUrls = [
    {
      url: 'https://weddingdirectoryflorida.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://weddingdirectoryflorida.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://weddingdirectoryflorida.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://weddingdirectoryflorida.com/categories',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // City URLs
  const cityUrls = cities.map((city) => ({
    url: `https://weddingdirectoryflorida.com/city/${encodeURIComponent(city.name.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Category URLs
  const categoryUrls = categories.map((category) => ({
    url: `https://weddingdirectoryflorida.com/category/${encodeURIComponent(category.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Combine all URLs
  return [...baseUrls, ...cityUrls, ...categoryUrls];
} 