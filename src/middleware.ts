import { type NextRequest, NextResponse } from 'next/server';

import { routes, validateTokenOnCheckout } from '@/lib';

export const config = {
  matcher: '/checkout/:path*',
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith(routes.EDGE_CHECKOUT)) {
    return validateTokenOnCheckout(req);
  }

  return NextResponse.next();
}
