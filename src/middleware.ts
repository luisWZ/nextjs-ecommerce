import { type NextRequest, NextResponse } from 'next/server';

import { validateTokenOnCheckout } from '@/lib';
import { routes } from '@/utils';

export const config = {
  matcher: '/checkout/:path*',
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith(routes.PAGE_CHECKOUT)) {
    return await validateTokenOnCheckout(req);
  }

  return NextResponse.next();
}
