import { Address, Cart, CartState, CartSummary } from '@/interface';
import { sortByTitleAndSize } from '@/utils';

export type CartActionType =
  | { type: 'CART_LOAD_CART_FROM_COOKIES'; payload: Cart[] }
  | { type: 'CART_LOAD_ADDRESS_FROM_COOKIES'; payload: Address }
  | { type: 'CART_UPLOAD_ADDRESS'; payload: Address }
  | { type: 'CART_UPDATE_ALL_CART'; payload: Cart[] }
  | { type: 'CART_ADD_PRODUCT'; payload: Cart }
  | { type: 'CART_IS_CREATING_ORDER' }
  | { type: 'CART_ORDER_COMPLETED' }
  | {
      type: 'CART_UPDATE_SUMMARY';
      payload: CartSummary;
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'CART_LOAD_CART_FROM_COOKIES':
      return {
        ...state,
        isInitialized: true,
        cart: [...action.payload].sort(sortByTitleAndSize),
      };

    case 'CART_LOAD_ADDRESS_FROM_COOKIES':
    case 'CART_UPLOAD_ADDRESS':
      return {
        ...state,
        isLoadingDeliveryAddress: false,
        deliveryAddress: action.payload,
      };

    case 'CART_UPDATE_ALL_CART':
      return {
        ...state,
        cart: [...action.payload].sort(sortByTitleAndSize),
      };

    case 'CART_ADD_PRODUCT':
      return {
        ...state,
        cart: [...state.cart, action.payload].sort(sortByTitleAndSize),
      };

    case 'CART_UPDATE_SUMMARY':
      return {
        ...state,
        ...action.payload,
      };

    case 'CART_IS_CREATING_ORDER':
      return {
        ...state,
        isCreatingOrder: !state.isCreatingOrder,
      };

    case 'CART_ORDER_COMPLETED':
      return {
        ...state,
        cart: [],
        itemCount: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
