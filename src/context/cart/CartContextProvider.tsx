import Cookie from 'js-cookie';
import { createContext, type PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { Address, CartState } from '@/interface';
import { cookie } from '@/lib';

import { calculateAmountsAndTotalItems } from './cartHelpers';
import { cartReducer } from './cartReducer';
import { CartSlices, cartSlices } from './cartSlice';

const INITIAL_STATE: CartState = {
  isCreatingOrder: false,
  isInitialized: false,
  cart: [],
  itemCount: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoadingDeliveryAddress: true,
  deliveryAddress: {} as Address,
};

type ContextProps = CartState & CartSlices;

export const CartContext = createContext({} as ContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const stateIsInitialized = useMemo(() => state.isInitialized, [state.isInitialized]);

  useEffect(() => {
    try {
      const cart = Cookie.get(cookie.CART);
      dispatch({ type: 'CART_LOAD_CART_FROM_COOKIES', payload: cart ? JSON.parse(cart) : [] });
    } catch (error) {
      dispatch({ type: 'CART_LOAD_CART_FROM_COOKIES', payload: [] });
    }
  }, []);

  useEffect(() => {
    try {
      const address = Cookie.get(cookie.ADDRESS);
      dispatch({
        type: 'CART_LOAD_ADDRESS_FROM_COOKIES',
        payload: address ? JSON.parse(address) : {},
      });
    } catch (error) {
      dispatch({ type: 'CART_LOAD_ADDRESS_FROM_COOKIES', payload: {} as Address });
    }
  }, []);

  useEffect(() => {
    if (!stateIsInitialized) return;
    Cookie.set(cookie.CART, JSON.stringify(state.cart));
  }, [state.cart, stateIsInitialized]);

  useEffect(() => {
    dispatch({ type: 'CART_UPDATE_SUMMARY', payload: calculateAmountsAndTotalItems(state.cart) });
  }, [state.cart]);

  const {
    cartAddProduct,
    cartRemoveProduct,
    cartStockAvailablePerItem,
    cartModifyItemQuantity,
    cartUpdateDeliveryAddress,
    cartCreateOrder
  } = cartSlices(state, dispatch);

  return (
    <CartContext.Provider
      value={{
        ...state,
        cartAddProduct,
        cartRemoveProduct,
        cartStockAvailablePerItem,
        cartModifyItemQuantity,
        cartUpdateDeliveryAddress,
        cartCreateOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
