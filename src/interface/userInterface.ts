import { User } from '@prisma/client';

export type UserLoginData = Pick<User, 'email' | 'role' | 'name' | 'password'>;

export type UserData = Pick<User, 'email' | 'role' | 'name'>;

export type UserApiResponse = { token: string; user: UserData };
