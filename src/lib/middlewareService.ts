import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { config, routes } from './config';
import { queryParam } from './config';
import { logger } from './logger';
import { messages } from './messages';

export const validateToken = async (req: NextRequest) => {
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

export const validateIsAdmin = async (req: NextRequest) => {
  const { url } = req;

  try {
    const session: any = await getToken({ req, secret: config.AUTH_SECRET });

    if (session && session.user.role === Role.ADMIN) {
      return NextResponse.next();
    }
  } catch (error) {
    logger.error(error);
  }

  const loginUrl = new URL(routes.PAGE_HOME, url);

  return NextResponse.redirect(loginUrl);
};

export const validateApiAccess = async (req: NextRequest) => {
  try {
    const session: any = await getToken({ req, secret: config.AUTH_SECRET });

    if (session && session.user.role === Role.ADMIN) {
      return NextResponse.next();
    }
  } catch (error) {
    logger.error(error);
  }

  return new Response(JSON.stringify({ message: messages.UNAUTHORIZED_ACCESS }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
