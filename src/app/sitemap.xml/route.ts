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
    const baseUrl = 'https://weddingdirectoryflorida.com'

    // Format city names to use dashes instead of spaces
    const cityUrls = cities.map(city => ({
      url: `${baseUrl}/city/${city.name.replace(/\s+/g, '-').toLowerCase()}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8
    }))

    // Category URLs
    const categoryUrls = categories.map(category => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8
    }))

    // Static URLs
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1.0
      },
      {
        url: `${baseUrl}/cities`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.7
      }
    ]

    // Combine all URLs
    const allUrls = [...staticUrls, ...cityUrls, ...categoryUrls]

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
    
    // Return a basic sitemap with static URLs if there's an error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://weddingdirectoryflorida.com</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
} 