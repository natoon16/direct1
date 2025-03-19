import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle city URLs
  if (pathname.startsWith('/city/')) {
    const cityPath = pathname.slice(6) // Remove '/city/'
    const decodedCity = decodeURIComponent(cityPath)
    
    // If the URL contains encoded spaces or special characters, redirect to the decoded version
    if (cityPath !== decodedCity) {
      return NextResponse.redirect(new URL(`/city/${decodedCity}`, request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on city routes
export const config = {
  matcher: '/city/:path*'
} 