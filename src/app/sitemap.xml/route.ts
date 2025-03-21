import { connectToDatabase } from '@/lib/mongodb'
import { getAllCities } from '@/lib/cities'
import { getAllCategories } from '@/lib/categories'
import { NextResponse } from 'next/server'

function generateSitemap(pages: Array<{
  url: string;
  lastModified: string;
  changeFrequency?: string;
  priority?: number;
}>) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastModified}</lastmod>
          ${page.changeFrequency ? `<changefreq>${page.changeFrequency}</changefreq>` : ''}
          ${page.priority ? `<priority>${page.priority}</priority>` : ''}
        </url>
      `).join('')}
    </urlset>`

  return xml
}

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()
    
    if (!db) {
      throw new Error('Database connection failed')
    }

    // Get all cities and categories
    const cities = await getAllCities()
    const categories = await getAllCategories()

    // Base URLs
    const baseUrls = [
      {
        url: 'https://weddingdirectoryflorida.com',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://weddingdirectoryflorida.com/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryflorida.com/contact',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryflorida.com/categories',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]

    // City URLs
    const cityUrls = cities.map((city) => ({
      url: `https://weddingdirectoryflorida.com/city/${encodeURIComponent(city.name.toLowerCase())}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }))

    // Category URLs
    const categoryUrls = categories.map((category) => ({
      url: `https://weddingdirectoryflorida.com/category/${encodeURIComponent(category.slug)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }))

    // Combine all URLs
    const allUrls = [...baseUrls, ...cityUrls, ...categoryUrls]

    // Generate XML
    const xml = generateSitemap(allUrls)

    // Return XML with proper headers
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return static URLs if there's an error
    const staticUrls = [
      {
        url: 'https://weddingdirectoryflorida.com',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://weddingdirectoryflorida.com/about',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryflorida.com/contact',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://weddingdirectoryflorida.com/categories',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]

    const xml = generateSitemap(staticUrls)
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
} 