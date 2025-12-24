import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if the user is logged in when accessing the homepage
  if (request.nextUrl.pathname === '/') {
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value;

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
};