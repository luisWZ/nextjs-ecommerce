import { Product, ValidSizes } from '@prisma/client';

export type Cart = Pick<Product, 'price' | 'slug' | 'gender' | 'title' | 'inStock'> & {
  quantity: number;
  size?: ValidSizes;
  image: string;
};

export interface CartState {
  isLoading: boolean;
  cart: Cart[];
  itemCount: number;
  subTotal: number;
  tax: number;
  total: number;
}

export type CartSummary = Pick<CartState, 'itemCount' | 'subTotal' | 'tax' | 'total'>;
