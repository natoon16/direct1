import { MetadataRoute } from 'next';
import { cities } from './data/cities';
import { categories } from './data/keywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.weddingdirectoryflorida.com';

  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap;

  // Add city pages
  cities.forEach((city) => {
    // City page
    routes.push({
      url: `${baseUrl}/city/${city.name.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // City + category pages
    categories.forEach((category) => {
      routes.push({
        url: `${baseUrl}/city/${city.name.toLowerCase()}?category=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // Add category pages
  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  return routes;
} 