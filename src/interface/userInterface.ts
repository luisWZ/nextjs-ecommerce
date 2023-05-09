import { User } from '@prisma/client';

export type UserLoginData = Pick<User, 'id' | 'email' | 'role' | 'name' | 'password'>;

export type UserData = Pick<User, 'id' | 'email' | 'role' | 'name'>;

export type UserApiResponse = { token: string; user: UserData };

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address_2: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}
