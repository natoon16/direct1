import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a city route
  if (pathname.startsWith('/city/')) {
    const cityPath = pathname.slice(6) // Remove '/city/' prefix
    
    // Normalize to the encoded version (with %20)
    const normalizedPath = encodeURIComponent(decodeURIComponent(cityPath))
    const currentPath = cityPath.replace(/ /g, '%20')
    
    // Only redirect if the current path is different from the normalized path
    if (currentPath !== normalizedPath) {
      const encodedPath = `/city/${normalizedPath}`
      return NextResponse.redirect(new URL(encodedPath, request.url), 301)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on city routes
export const config = {
  matcher: '/city/:path*'
} 