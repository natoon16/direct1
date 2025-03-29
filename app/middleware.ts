import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limiting store
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'anonymous';
    const now = Date.now();

    // Get or create rate limit entry
    const rateLimitEntry = rateLimit.get(ip);
    if (!rateLimitEntry) {
      rateLimit.set(ip, { count: 1, timestamp: now });
    } else {
      // Reset if window has passed
      if (now - rateLimitEntry.timestamp > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { count: 1, timestamp: now });
      } else {
        // Check if rate limit exceeded
        if (rateLimitEntry.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        rateLimitEntry.count++;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 