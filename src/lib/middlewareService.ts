import { NextRequest, NextResponse } from 'next/server';

import { cookie } from '@/utils';

import { validateAndDecodeToken } from './jwtService';
import { logger } from './logger';

export const validateTokenOnCheckout = async (req: NextRequest) => {
  const { cookies, nextUrl, url } = req;

  const token = cookies.get(cookie.TOKEN)?.value ?? '';

  try {
    await validateAndDecodeToken(token);
    return NextResponse.next();
  } catch (error) {
    logger.error(error);

    const loginUrl = new URL('/auth/login', url);
    loginUrl.searchParams.set('page', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
};
