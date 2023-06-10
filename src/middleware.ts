import { type NextRequest, NextResponse } from 'next/server';

import { routes, validateApiAccess, validateIsAdmin, validateToken } from '@/lib';

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith(routes.EDGE_CHECKOUT)) {
    return validateToken(req);
  }

  if (nextUrl.pathname.startsWith(routes.PAGE_ADMIN)) {
    return validateIsAdmin(req);
  }

  if (nextUrl.pathname.startsWith(routes.EDGE_API_ADMIN)) {
    return validateApiAccess(req);
  }

  return NextResponse.next();
}
