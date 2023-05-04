import { Cart } from '@/interface';
import { config } from '@/utils';

type OrderSummaryActionType = { type: 'UPDATE_STATE'; payload: Cart[] };

interface OrderSummaryState {
  amount: number;
  tax: number;
  total: number;
  totalItems: number;
}

export const orderSummaryInitialState: OrderSummaryState = {
  amount: 0,
  tax: 0,
  total: 0,
  totalItems: 0,
};

export const initializeOrderSummaryState =
  (cart: Cart[]) =>
  (_state: OrderSummaryState): OrderSummaryState => {
    return calculateAmountsAndTotalItems(cart);
  };

export const orderSummaryReducer = (
  state: OrderSummaryState,
  action: OrderSummaryActionType
): OrderSummaryState => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return calculateAmountsAndTotalItems(action.payload);

    default:
      return state;
  }
};

function calculateAmountsAndTotalItems(cart: Cart[]): OrderSummaryState {
  let totalItems = 0;
  const amount = cart.reduce((total, item) => {
    totalItems += item.quantity;
    return total + item.price * item.quantity;
  }, 0);
  const tax = (amount * 10 * config.TAX_PERCENT) / 1000;
  const total = amount + tax;

  return { amount, tax, total, totalItems };
}
