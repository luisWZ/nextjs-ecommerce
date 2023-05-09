import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { createUserFromOAuth, validateUserEmailAndPassword } from '@/database';
import { UserData } from '@/interface';
import { config, routes } from '@/lib';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          return validateUserEmailAndPassword(credentials!);
        } catch (error) {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: routes.PAGE_LOGIN,
    newUser: routes.PAGE_REGISTER,
  },

  session: {
    strategy: 'jwt',
    maxAge: config.ONE_MONTH,
    updateAge: config.ONE_DAY,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token!;

        switch (account.type) {
          case 'oauth':
            try {
              token.user = await createUserFromOAuth(user.email ?? '', user.name ?? '');
            } catch (error) {
              token.user = null;
            }
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // console.log({ session, token, user });
      session.accessToken = token.accessToken as string;
      session.user = token.user as UserData;

      return session;
    },
  },
};

export default NextAuth(authOptions);
