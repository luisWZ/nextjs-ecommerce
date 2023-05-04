import { Cart, CartSummary } from '@/interface';
import { config } from '@/utils';

export const calculateAmountsAndTotalItems = (cart: Cart[]): CartSummary => {
  let itemCount = 0;
  const subTotal = cart.reduce((total, item) => {
    itemCount += item.quantity;
    return total + item.price * item.quantity;
  }, 0);
  const tax = (subTotal * 10 * config.TAX_PERCENT) / 1000;
  const total = subTotal + tax;

  return { itemCount, subTotal, tax, total };
};
