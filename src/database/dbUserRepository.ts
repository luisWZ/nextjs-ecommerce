import { Prisma, Role } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';

import type { UserData, UserLoginData } from '@/interface';
import { logger, messages } from '@/lib';

import { db } from './db';

const selectUserLogin: Required<
  Pick<Prisma.UserSelect, 'id' | 'email' | 'role' | 'name' | 'password'>
> = {
  id: true,
  email: true,
  role: true,
  name: true,
  password: true,
};

const selectUser: Required<Pick<Prisma.UserSelect, 'id' | 'email' | 'role' | 'name'>> = {
  id: true,
  email: true,
  role: true,
  name: true,
};

interface FindUserByEmailOptions {
  withPassword: boolean;
}

export const findAllUsers = async () => {
  return db.user.findMany({ select: selectUser });
};

export const findUserByEmail = async (
  email: string,
  option: FindUserByEmailOptions = { withPassword: false }
): Promise<UserLoginData | UserData> => {
  return option.withPassword
    ? db.user.findFirstOrThrow({ where: { email }, select: selectUserLogin })
    : db.user.findFirstOrThrow({ where: { email }, select: selectUser });
};

export const validateUserEmailAndPassword = async ({
  email = '',
  password = '',
}: Record<'email' | 'password', string>): Promise<UserData> => {
  try {
    const user = await db.user.findFirstOrThrow({ where: { email }, select: selectUserLogin });

    const isValidPassword = await bcrypt.compare(password, user.password!);

    if (!isValidPassword) throw new Error(messages.USER_INVALID_PASSWORD_COMPARISON);

    const { id, role, name } = user;

    return { id, email, role, name };
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      logger.error(error);
    }
    throw error;
  }
};

export const createUserFromOAuth = async (
  oAuthEmail: string = '',
  oAuthName: string = 'client'
): Promise<UserData> => {
  try {
    if (oAuthEmail === '') throw new Error(messages.USER_INVALID_EMAIL);

    const user = await db.user.findFirst({ where: { email: oAuthEmail }, select: selectUser });

    return user
      ? user
      : db.user.create({
          data: { email: oAuthEmail, password: '@', role: 'CLIENT', name: oAuthName },
          select: selectUser,
        });
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      logger.error(error);
    }
    throw error;
  }
};

export const countAllUsers = () => db.user.count({ where: { role: 'CLIENT' } });

export const updateUserRole = (id: string, role: Role) => {
  return db.user.update({ where: { id }, data: { role } });
};
