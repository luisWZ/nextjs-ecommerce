import { Product, ValidSizes } from '@prisma/client';

import { Address } from './userInterface';

export type Cart = Pick<Product, 'price' | 'slug' | 'gender' | 'title' | 'inStock'> & {
  quantity: number;
  size?: ValidSizes;
  image: string;
};

export interface CartState {
  isCreatingOrder: boolean;
  isInitialized: boolean;
  cart: Cart[];
  itemCount: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoadingDeliveryAddress: boolean;
  deliveryAddress: Address;
}

export type CartSummary = Pick<CartState, 'itemCount' | 'subTotal' | 'tax' | 'total'>;
