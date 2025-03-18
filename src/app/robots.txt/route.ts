import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `# Allow all search engines
User-agent: *
Allow: /

# Explicitly allow Bingbot
User-agent: bingbot
Allow: /

# Sitemap
Sitemap: https://weddingdirectoryflorida.com/sitemap.xml
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 