import { connectToDatabase } from '@/lib/mongodb'
import { PlaceCache } from '@/models/PlaceCache'
import { MetadataRoute } from 'next'

export async function GET(): Promise<MetadataRoute.Sitemap> {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get all unique cities and categories from the cache
    const uniqueCities = await PlaceCache.distinct('city')
    const uniqueCategories = await PlaceCache.distinct('category')

    const baseUrl = 'https://weddingdirectoryflorida.com'
    const currentDate = new Date().toISOString()

    const sitemap: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]

    // Add city pages
    for (const city of uniqueCities) {
      sitemap.push({
        url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase())}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      })

      // Add category pages for each city
      for (const category of uniqueCategories) {
        sitemap.push({
          url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(category.toLowerCase())}`,
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 0.9,
        })
      }
    }

    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
} 