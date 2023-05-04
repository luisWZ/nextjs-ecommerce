import Cookie from 'js-cookie';
import { createContext, type PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { CartState } from '@/interface';
import { cookie } from '@/utils';

import { calculateAmountsAndTotalItems } from './cartHelpers';
import { cartReducer } from './cartReducer';
import { CartSlices, cartSlices } from './cartSlice';

const INITIAL_STATE: CartState = {
  isLoading: true,
  cart: [],
  itemCount: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

type ContextProps = CartState & CartSlices;

export const CartContext = createContext({} as ContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const stateIsLoading = useMemo(() => state.isLoading, [state.isLoading]);

  useEffect(() => {
    try {
      const cart = Cookie.get(cookie.CART);
      dispatch({ type: 'CART_LOAD_FROM_COOKIES', payload: cart ? JSON.parse(cart) : [] });
    } catch (error) {
      dispatch({ type: 'CART_LOAD_FROM_COOKIES', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (stateIsLoading) return;
    Cookie.set(cookie.CART, JSON.stringify(state.cart));
  }, [state.cart, stateIsLoading]);

  useEffect(() => {
    dispatch({ type: 'CART_UPDATE_SUMMARY', payload: calculateAmountsAndTotalItems(state.cart) });
  }, [state.cart]);

  const { cartAddProduct, cartRemoveProduct, cartStockAvailablePerItem, cartModifyItemQuantity } =
    cartSlices(state, dispatch);

  return (
    <CartContext.Provider
      value={{
        ...state,
        cartAddProduct,
        cartRemoveProduct,
        cartStockAvailablePerItem,
        cartModifyItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
