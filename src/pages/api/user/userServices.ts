import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
// import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import type { UserData, UserLoginData } from '@/interface';
import { createToken, db, decodeToken, findUserByEmail, logger } from '@/server';
import { config, messages } from '@/utils';

import { UserResponseData } from './userResponseData';

export const userLogin = async (req: NextApiRequest, res: NextApiResponse<UserResponseData>) => {
  const { email = '', password = '' } = req.body;

  try {
    const userExist = Boolean(await db.user.count({ where: { email } }));

    if (!userExist) {
      return res.status(400).json({ message: messages.USER_INVALID_LOGIN });
    }

    const user = (await findUserByEmail(email, { withPassword: true })) as UserLoginData;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: messages.USER_INVALID_LOGIN });
    }

    const token = await createToken(user);

    const { role, name } = user;

    return res.status(200).json({ token, user: { email, role, name } });
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === 'P2025') {
      return res.status(400).json({ message: messages.USER_INVALID_LOGIN });
    }

    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const userRegister = async (req: NextApiRequest, res: NextApiResponse<UserResponseData>) => {
  const { email = '', password = '', name = '' } = req.body as Record<string, string>;
  try {
    // if (!isAlphanumeric(name, 'es-ES')) {
    // return res.status(400).json({ message: messages.USER_INVALID_NAME });
    // } else if (name.length < 3) {
    if (name.length < 3) {
      return res.status(400).json({ message: messages.USER_INVALID_NAME_LENGTH });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: messages.USER_INVALID_EMAIL });
    }

    if (
      !isStrongPassword(password, {
        minLength: 6,
        minLowercase: 2,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({ message: messages.USER_INVALID_PASSWORD });
    }

    const encryptedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);

    await db.user.create({
      data: { email, password: encryptedPassword, name },
      select: { id: true },
    });

    const user: UserData = { email, name, role: 'CLIENT' };

    const token = await createToken(user);

    return res.status(200).json({ token, user });
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === 'P2002') {
      return res.status(400).json({ message: messages.USER_EMAIL_TAKEN });
    }

    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const validateUser = async (req: NextApiRequest, res: NextApiResponse<UserResponseData>) => {
  const { token = '' } = req.cookies;

  try {
    const email = await decodeToken(token);

    const user = (await findUserByEmail(email)) as UserData;

    const newToken = await createToken(user);

    return res.status(200).json({ token: newToken, user });
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ message: messages.USER_VALIDATION_FAIL });
  }
};
