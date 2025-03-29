import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Store for rate limiting
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? 'anonymous';
    const now = Date.now();

    // Get or create rate limit entry
    const rateLimit = rateLimitStore.get(ip);
    if (!rateLimit) {
      rateLimitStore.set(ip, { count: 1, timestamp: now });
    } else {
      // Reset if window has passed
      if (now - rateLimit.timestamp > RATE_LIMIT_WINDOW) {
        rateLimit.count = 1;
        rateLimit.timestamp = now;
      } else {
        rateLimit.count++;
      }

      // Check if rate limit exceeded
      if (rateLimit.count > RATE_LIMIT) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 