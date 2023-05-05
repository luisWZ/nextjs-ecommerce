import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, type PropsWithChildren, useEffect, useReducer } from 'react';

import { UserApiResponse, UserData } from '@/interface';
import { tesloApi } from '@/lib';
import { cookie, messages } from '@/utils';

import { AuthActionType, authReducer } from './authReducer';

export interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
}

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
};

type ContextProps = AuthState & {
  authLogin: ({ email, password }: Record<string, string>) => Promise<boolean | string>;
  authRegister: ({ name, email, password }: Record<string, string>) => Promise<boolean | string>;
  authLogout: () => void;
};

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    validateUserToken();
  }, []);

  const validateUserToken = async () => {
    if (!Cookies.get(cookie.TOKEN)) return;

    try {
      const { data } = await tesloApi.get<UserApiResponse>('/user/validate-user');
      const { token, user } = data;

      Cookies.set(cookie.TOKEN, token);

      dispatch({ type: 'AUTH_LOGIN', payload: user });
    } catch (error) {
      Cookies.remove(cookie.TOKEN);
    }
  };

  const authLogin: ContextProps['authLogin'] = loginUser(dispatch, '/user/login');

  const authRegister: ContextProps['authRegister'] = loginUser(dispatch, '/user/register');

  const authLogout: ContextProps['authLogout'] = () => {
    Cookies.remove(cookie.TOKEN);
    Cookies.remove(cookie.CART);
    dispatch({ type: 'AUTH_LOGOUT' });
    router.reload();
  };

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
