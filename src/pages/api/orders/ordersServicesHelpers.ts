import { Product } from '@prisma/client';
import axios from 'axios';

import type { Cart, CartSummary, PaypalOAuthTokenResponse } from '@/interface';
import { config, logger, messages } from '@/lib';

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

export const getPaypalBearerToken = async (): Promise<string | null> => {
  const body = new URLSearchParams('grant_type=client_credentials');
  const base64Token = Buffer.from(
    `${config.PAYPAL_CLIENT_ID}:${config.PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  try {
    const { data } = await axios.post<PaypalOAuthTokenResponse>(config.PAYPAL_URL_OAUTH, body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(error.response?.data);
    } else {
      logger.error(error);
    }

    return null;
  }
};
