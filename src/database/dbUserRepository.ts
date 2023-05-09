import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import type { UserData, UserLoginData } from '@/interface';

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
}: Record<'email' | 'password', string>): Promise<UserData | null> => {
  const user = await db.user.findFirst({ where: { email }, select: selectUserLogin });

  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.password ?? '');

  if (!isValidPassword) return null;

  const { id, role, name } = user;

  return { id, email, role, name };
};

export const createUserFromOAuth = async (
  oAuthEmail: string = '',
  oAuthName: string = 'client'
): Promise<UserData> => {
  // if (oAuthEmail === undefined) return null;
  let user = await db.user.findFirst({ where: { email: oAuthEmail }, select: selectUser });

  if (!user) {
    user = await db.user.create({
      data: { email: oAuthEmail, role: 'CLIENT', name: oAuthName },
      select: selectUser,
    });
  }

  const { id, email, role, name } = user;

  return { id, email, role, name };
};
