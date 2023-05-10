import { Order } from '@prisma/client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'react';

import { Address, Cart, CartState } from '@/interface';
import { cookie, logger, messages, routes, tesloApi } from '@/lib';

import { CartActionType } from './cartReducer';

export interface CartSlices {
  cartAddProduct: (item: Cart) => void;
  cartRemoveProduct: (item: { slug: string; size: string }) => () => void;
  cartStockAvailablePerItem: (slug: string) => () => number;
  cartModifyItemQuantity: (amount: number, item: Pick<Cart, 'slug' | 'size'>) => void;
  cartUpdateDeliveryAddress: (address: Address) => void;
  cartCreateOrder: () => Promise<
    { order: Order; error: undefined } | { order: undefined; error: string }
  >;
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

  cartUpdateDeliveryAddress: (address) => {
    Cookies.set(cookie.ADDRESS, JSON.stringify(address));
    dispatch({ type: 'CART_UPLOAD_ADDRESS', payload: address });
  },

  cartCreateOrder: async () => {
    try {
      dispatch({ type: 'CART_IS_CREATING_ORDER' });

      if (!state.deliveryAddress.address) throw new Error(messages.CART_INVALID_ADDRESS);

      const { data: order } = await tesloApi.post<Order>(routes.API_ORDERS, {
        cart: state.cart,
        deliveryAddress: state.deliveryAddress,
        total: state.total,
      });

      // logger.info(order);

      dispatch({ type: 'CART_ORDER_COMPLETED' });

      return { order };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(error);
        return { error: error.response?.data.message as string };
      }

      return { error: messages.SERVER_ERROR };
      // } finally {
      // dispatch({ type: 'CART_IS_CREATING_ORDER' });
    }
  },
});
