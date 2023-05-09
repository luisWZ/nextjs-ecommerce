import { useSession } from 'next-auth/react';
import { createContext, type PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { UserData } from '@/interface';

import { validateCookieToken } from './authHelpers';
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
  const { data: session, status } = useSession();

  const validateToken = useMemo(() => validateCookieToken(dispatch), [dispatch]);

  const { authLogin, authRegister, authLogout } = useMemo(() => authSlice({ dispatch }), []);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user) {
        // console.log({ user: session.user });
        dispatch({ type: 'AUTH_LOGIN', payload: session.user });
      }
    }
  }, [status, session]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

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
