import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a city route
  if (pathname.startsWith('/city/')) {
    const cityPath = pathname.slice(6) // Remove '/city/' prefix
    
    // If the URL contains spaces, encode them
    if (cityPath.includes(' ')) {
      const encodedPath = `/city/${encodeURIComponent(cityPath)}`
      return NextResponse.redirect(new URL(encodedPath, request.url))
    }
    
    // If the URL contains %20, decode it
    if (cityPath.includes('%20')) {
      const decodedPath = `/city/${decodeURIComponent(cityPath)}`
      return NextResponse.redirect(new URL(decodedPath, request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on city routes
export const config = {
  matcher: '/city/:path*'
} 