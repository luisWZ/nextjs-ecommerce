import { UserData } from '@/interface';

import { AuthState } from './AuthContextProvider';

export type AuthActionType = { type: 'AUTH_LOGIN'; payload: UserData } | { type: 'AUTH_LOGOUT' };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
