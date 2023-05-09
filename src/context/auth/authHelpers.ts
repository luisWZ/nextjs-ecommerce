import Cookies from 'js-cookie';
import { Dispatch } from 'react';

import { UserApiResponse } from '@/interface';
import { cookie, routes, tesloApi } from '@/lib';

import { AuthActionType } from './authReducer';

export const validateCookieToken = (dispatch: Dispatch<AuthActionType>) => () => {
  if (!Cookies.get(cookie.TOKEN)) return;

  tesloApi
    .get<UserApiResponse>(routes.API_USER_VALIDATE)
    .then(({ data }) => {
      const { token, user } = data;
      Cookies.set(cookie.TOKEN, token);
      dispatch({ type: 'AUTH_LOGIN', payload: user });
    })
    .catch(() => Cookies.remove(cookie.TOKEN));
};
