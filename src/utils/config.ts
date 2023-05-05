export const config = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  MAX_CART_ITEMS_PER_SIZE: 10,
  NODE_ENV: process.env.NODE_ENV,
  ONE_DAY: 86_400, // 60 * 60 * 24
  SALT_ROUNDS: 10,
  TAX_PERCENT: 8,
  NAME_MIN_LENGTH: 4,
};

export const cookie = {
  CART: 'cart',
  TOKEN: 'token',
  ADDRESS: 'address',
};
