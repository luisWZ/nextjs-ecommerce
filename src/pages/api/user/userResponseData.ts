import { UserApiResponse } from '@/interface';

export type UserResponseData = { message: string } | UserApiResponse | { email: string };
