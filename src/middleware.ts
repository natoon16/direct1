import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a city route
  if (pathname.startsWith('/city/')) {
    const cityPath = pathname.slice(6) // Remove '/city/' prefix
    
    // First decode any encoded characters
    const decodedPath = decodeURIComponent(cityPath)
    
    // Convert spaces to dashes
    const dashedPath = decodedPath.replace(/\s+/g, '-').toLowerCase()
    
    // Only redirect if the path needs normalization
    if (cityPath !== dashedPath) {
      const normalizedPath = `/city/${dashedPath}`
      return NextResponse.redirect(new URL(normalizedPath, request.url), 301)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on city routes
export const config = {
  matcher: '/city/:path*'
} 