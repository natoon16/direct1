import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://weddingdirectoryflorida.com/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 