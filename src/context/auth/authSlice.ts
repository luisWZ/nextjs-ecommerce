import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { Dispatch } from 'react';

import { UserApiResponse } from '@/interface';
import { tesloApi } from '@/lib';
import { cookie, messages, routes } from '@/utils';

import { AuthActionType } from './authReducer';

export type AuthSlice = {
  authLogin: ({ email, password }: Record<string, string>) => Promise<boolean | string>;
  authRegister: ({ name, email, password }: Record<string, string>) => Promise<boolean | string>;
  authLogout: () => void;
};

type AuthSliceArgs = {
  /* state: AuthState; */
  dispatch: Dispatch<AuthActionType>;
  router: NextRouter;
};

export const authSlice = ({ dispatch, router }: AuthSliceArgs): AuthSlice => ({
  authLogin: loginUser(dispatch, routes.API_USER_LOGIN),

  authRegister: loginUser(dispatch, routes.API_USER_REGISTER),

  authLogout: () => {
    Cookies.remove(cookie.TOKEN);
    Cookies.remove(cookie.CART);
    Cookies.remove(cookie.ADDRESS);

    dispatch({ type: 'AUTH_LOGOUT' });
    router.reload();
  },
});

function loginUser(dispatch: (value: AuthActionType) => void, urlPath: string) {
  return async (body: Record<string, string>) => {
    try {
      const { data } = await tesloApi.post<UserApiResponse>(urlPath, body);
      const { token, user } = data;

      Cookies.set(cookie.TOKEN, token);

      dispatch({ type: 'AUTH_LOGIN', payload: user });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data.message;
      }

      return messages.USER_DATA_ERROR;
    }
  };
}
