import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, type PropsWithChildren, useEffect, useReducer } from 'react';

import { UserApiResponse, UserData } from '@/interface';
import { tesloApi } from '@/lib';
import { cookie, routes } from '@/lib';

import { authReducer } from './authReducer';
import { AuthSlice, authSlice } from './authSlice';

export interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
};

type ContextProps = AuthState & AuthSlice;

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const router = useRouter();

  const { authLogin, authRegister, authLogout } = authSlice({
    dispatch,
    router,
  });

  useEffect(() => {
    if (!Cookies.get(cookie.TOKEN)) return;

    tesloApi
      .get<UserApiResponse>(routes.API_USER_VALIDATE)
      .then(({ data }) => {
        const { token, user } = data;
        Cookies.set(cookie.TOKEN, token);
        dispatch({ type: 'AUTH_LOGIN', payload: user });
      })
      .catch(() => Cookies.remove(cookie.TOKEN));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authLogin,
        authRegister,
        authLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
