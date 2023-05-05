import { Prisma } from '@prisma/client';

import { db } from './db';

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
