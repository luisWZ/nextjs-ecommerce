import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import isJWT from 'validator/lib/isJWT';

import type { UserData } from '@/interface';
import { config, messages } from '@/utils';

import { logger } from './logger';

export const createToken = async (user: UserData) => {
  const { role, email, name } = user;

  try {
    if (!config.AUTH_SECRET) throw new Error(messages.AUTH_SECRET_MISSING);

    return new SignJWT({ role, email, name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(config.AUTH_SECRET));
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const validateAndDecodeToken = async (token: string) => {
  if (!isJWT(token)) {
    return Promise.reject(messages.AUTH_JWT_INVALID);
  }

  try {
    if (!config.AUTH_SECRET) throw new Error(messages.AUTH_SECRET_MISSING);

    const verified = await jwtVerify(token, new TextEncoder().encode(config.AUTH_SECRET));
    const { email } = verified.payload as JWTPayload & UserData;

    return email;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
