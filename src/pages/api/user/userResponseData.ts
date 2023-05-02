import { UserData } from '@/server';

export type UserResponseData =
  | { message: string }
  | { token: string; user: UserData }
  | { email: string };
