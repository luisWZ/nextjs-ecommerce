export const config = {
  AUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  NODE_ENV: process.env.NODE_ENV,
  PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
  PAYPAL_SECRET: process.env.PAYPAL_SECRET ?? '',
  PAYPAL_URL_OAUTH: process.env.PAYPAL_URL_OAUTH ?? '',
  PAYPAL_URL_ORDERS: process.env.PAYPAL_URL_ORDERS ?? '',
  CURRENCY: 'USD',
  MAX_CART_ITEMS_PER_SIZE: 10,
  NAME_MIN_LENGTH: 4,
  ONE_DAY: 86_400, // 60 * 60 * 24
  ONE_MONTH: 2_592_000, // 60 * 60 * 24 * 30
  SALT_ROUNDS: 10,
  TAX_PERCENT: 8,
};

export const cookie = {
  ADDRESS: 'address',
  CART: 'cart',
  TOKEN: 'token',
} as const;

export const routes = {
  API_BASE_URL: '/api',
  API_ADMIN_USERS: '/admin/users',
  API_ADMIN_ORDERS: '/admin/orders',
  API_ORDERS: '/orders',
  API_ORDERS_PAY: '/orders/pay',
  API_PRODUCTS: '/products',
  API_USER_LOGIN: '/user/login',
  API_USER_REGISTER: '/user/register',
  API_USER_VALIDATE: '/user/validate-user',
  EDGE_CHECKOUT: '/checkout',
  EDGE_API_ADMIN: '/api/admin',
  PAGE_HOME: '/',
  PAGE_ADMIN: '/admin',
  PAGE_ADMIN_DASHBOARD: '/admin/dashboard',
  PAGE_ADMIN_ORDERS: '/admin/orders',
  PAGE_ADMIN_PRODUCTS: '/admin/products',
  PAGE_ADMIN_USERS: '/admin/users',
  PAGE_CART_EMPTY: '/cart/empty',
  PAGE_CART: '/cart',
  PAGE_CATEGORY_KIDS: '/category/kids',
  PAGE_CATEGORY_MEN: '/category/men',
  PAGE_CATEGORY_WOMEN: '/category/women',
  PAGE_CHECKOUT_ADDRESS: '/checkout/address',
  PAGE_CHECKOUT_SUMMARY: '/checkout/summary',
  PAGE_LOGIN: '/auth/login',
  PAGE_ORDERS: '/orders',
  PAGE_ORDERS_HISTORY: '/orders/history',
  PAGE_PRODUCT: '/product',
  PAGE_REGISTER: '/auth/register',
  PAGE_SEARCH: '/search',
  PUBLIC_PRODUCTS: '/products',
} as const;

export const queryParam = {
  PAGE: 'page',
  SEARCH: 'q',
};
