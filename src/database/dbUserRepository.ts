import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { UserData } from '@/interface';

import { db } from './db';

const selectUserLogin: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
  name: true,
  password: true,
};

const selectUser: Prisma.UserSelect = {
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
) => {
  return option.withPassword
    ? db.user.findFirstOrThrow({ where: { email }, select: selectUserLogin })
    : db.user.findFirstOrThrow({ where: { email }, select: selectUser });
};

export const validateUserEmailAndPassword = async ({
  email = '',
  password = '',
}: Record<'email' | 'password', string>) => {
  const user = await db.user.findFirst({ where: { email }, select: selectUserLogin });

  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.password!);

  if (!isValidPassword) return null;

  delete user.password;
  const { id, role, name } = user;

  return { id, email, role, name } as UserData;
};

export const createUserFromOAuth = async (
  oAuthEmail: string = '',
  oAuthName: string = 'client'
) => {
  // if (oAuthEmail === undefined) return null;
  let user = await db.user.findFirst({ where: { email: oAuthEmail }, select: selectUser });

  if (!user) {
    user = await db.user.create({
      data: { email: oAuthEmail, role: 'CLIENT', name: oAuthName },
      select: selectUser,
    });
  }

  const { id, email, role, name } = user;

  return { id, email, role, name } as UserData;
};
