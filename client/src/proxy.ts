/**
 * Next.js Proxy for route protection
 * Runs on the Edge Runtime - fast and secure
 * Note: middleware.ts is deprecated in Next.js 16, use proxy.ts instead
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password', '/', '/api-test', '/lawyers-directory', '/community', '/resources'];

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/lawyer', '/client'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token')?.value;

  // Check if route is public (including sub-routes for things like resources)
  const isPublicRoute = publicRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );

  // Check if route is protected
  const isProtectedRoute = !isPublicRoute && protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing login/register with token, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

