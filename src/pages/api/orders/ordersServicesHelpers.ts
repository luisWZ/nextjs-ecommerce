import { Product } from '@prisma/client';

import { Cart, CartSummary } from '@/interface';
import { config, messages } from '@/lib';

export const calculateCartSummary = (cart: Cart[], products: Product[]): CartSummary => {
  let itemCount = 0;

  const subTotal = cart.reduce((total, item) => {
    itemCount += item.quantity;

    const price = products.find(({ slug }) => slug === item.slug)?.price;
    if (!price) throw new Error(messages.CART_INVALID_PRODUCT);

    return total + price * item.quantity;
  }, 0);

  const tax = (subTotal * 10 * config.TAX_PERCENT) / 1000;

  const total = subTotal + tax;

  return { itemCount, subTotal, tax, total };
};
