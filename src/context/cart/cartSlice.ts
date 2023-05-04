import { Dispatch } from 'react';

import { Cart, CartState } from '@/interface';

import { CartActionType } from './cartReducer';

export interface CartSlices {
  cartAddProduct: (item: Cart) => void;
  cartRemoveProduct: (item: Cart) => () => void;
  cartStockAvailablePerItem: (slug: string) => () => number;
  cartModifyItemQuantity: (amount: number, item: Pick<Cart, 'slug' | 'size'>) => void;
}

export const cartSlices = (state: CartState, dispatch: Dispatch<CartActionType>): CartSlices => ({
  cartAddProduct: (item) => {
    const itemInCart = state.cart.find(
      (cart) => cart.slug === item.slug && cart.size === item.size
    );

    if (itemInCart) {
      itemInCart.quantity += item.quantity;
      dispatch({ type: 'CART_UPDATE_ALL_CART', payload: state.cart });
    } else {
      dispatch({ type: 'CART_ADD_PRODUCT', payload: item });
    }
  },

  cartRemoveProduct: (item) => () => {
    const newCart = state.cart.filter((cart) => {
      if (cart.slug === item.slug) {
        return cart.size !== item.size;
      }
      return true;
    });
    dispatch({ type: 'CART_UPDATE_ALL_CART', payload: newCart });
  },

  cartStockAvailablePerItem: (slug) => () => {
    const items = state.cart.filter((item) => item.slug === slug);
    const maxStock = items[0].inStock;
    const count = items
      .map((item) => item.quantity)
      .reduce((count, quantity) => count + quantity, 0);
    return maxStock - count;
  },

  cartModifyItemQuantity: (amount, item) => {
    const selectedItem = state.cart.find(
      (cart) => cart.slug === item.slug && cart.size === item.size
    );

    if (selectedItem) {
      selectedItem.quantity = amount;
      dispatch({ type: 'CART_UPDATE_ALL_CART', payload: state.cart });
    }
  },
});
