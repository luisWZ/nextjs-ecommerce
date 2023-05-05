import { type NextRequest, NextResponse } from 'next/server';

import { validateTokenOnCheckout } from '@/lib';

export const config = {
  matcher: '/checkout/:path*',
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith('/checkout')) {
    return await validateTokenOnCheckout(req);
  }

  return NextResponse.next();
}
