import { Prisma, User } from '@prisma/client';

import { db } from './db';

export type UserLoginData = Pick<User, 'email' | 'role' | 'name' | 'password'>;

export type UserData = Pick<User, 'email' | 'role' | 'name'>;

const selectUserLogin: Prisma.UserSelect = {
  email: true,
  role: true,
  name: true,
  password: true,
};

const selectUser: Prisma.UserSelect = {
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
