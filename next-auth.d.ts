/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '@prisma/client';
import NextAuth, { DefaultSession, TokenSet } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserData } from './src/interface/userInterface';

declare module 'next-auth' {
  interface User extends UserData {}

  interface Session {
    accessToken: string;
    user: UserData;
  }

  interface JWT {
    accessToken: string;
    user: UserData;
  }
}
