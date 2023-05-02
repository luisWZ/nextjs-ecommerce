import jwt from 'jsonwebtoken';

import { UserData } from '@/pages/api/user/userResponseData';
import { config, messages } from '@/utils';

import { logger } from './logger';

export const createToken = async (user: UserData) => {
  return new Promise<string>((resolve, reject) => {
    try {
      if (!config.AUTH_SECRET) throw new Error(messages.AUTH_SECRET_MISSING);

      jwt.sign(
        { email: user.email, role: user.role, name: user.name },
        config.AUTH_SECRET,
        { algorithm: 'HS256' },
        (error, token) => {
          if (error || !token) throw error;
          return resolve(token);
        }
      );
    } catch (error) {
      logger.error(error);
      reject(error as Error);
    }
  });
};

export const decodeToken = (token: string) => {
  return new Promise<string>((resolve, reject) => {
    try {
      if (!config.AUTH_SECRET) throw new Error(messages.AUTH_SECRET_MISSING);

      jwt.verify(token, config.AUTH_SECRET, (error, payload) => {
        if (error) throw error;

        const { email } = payload as { email: string };

        resolve(email);
      });
    } catch (error) {
      logger.error(error);
      reject(false);
    }
  });
};
