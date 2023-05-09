import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { config, routes } from './config';
import { queryParam } from './config';
import { logger } from './logger';

export const validateTokenOnCheckout = async (req: NextRequest) => {
  const { nextUrl, url } = req;

  try {
    const session = await getToken({ req, secret: config.AUTH_SECRET });

    if (session) {
      return NextResponse.next();
    }
  } catch (error) {
    logger.error(error);
  }

  const loginUrl = new URL(routes.PAGE_LOGIN, url);
  loginUrl.searchParams.set(queryParam.PAGE, nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
};
