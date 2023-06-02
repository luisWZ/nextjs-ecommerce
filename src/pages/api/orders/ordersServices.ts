import { OrderItem, Product } from '@prisma/client';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { db } from '@/database';
import type { Cart, CartState, PaypalOrderStatusResponse } from '@/interface';
import { config, logger, messages } from '@/lib';

import { OrdersResponseData } from './ordersResponseData';
import { calculateCartSummary, getPaypalBearerToken } from './ordersServicesHelpers';

type CreateOrderBody = Pick<
  CartState,
  'deliveryAddress' | 'itemCount' | 'subTotal' | 'tax' | 'total'
> & { cart: Required<Cart>[] };

export const createOneOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<OrdersResponseData>
) => {
  const { cart = [], deliveryAddress, total } = req.body as CreateOrderBody;

  try {
    if (!cart.length) {
      throw new Error(messages.CART_EMPTY);
    }

    const session: any = await getToken({ req, secret: config.AUTH_SECRET });

    // logger.info({ session });

    if (!session) {
      return res.status(401).json({ message: messages.USER_UNAUTHORIZED });
    }

    const orderItems: OrderItem[] = cart.map(
      ({ price, slug, gender, title, quantity, size, image }) => ({
        price,
        slug,
        gender,
        title,
        quantity,
        size,
        image,
      })
    );

    const productSlugs = cart.map(({ slug }) => slug);

    const products = await db.product.findRaw({
      filter: { slug: { $in: productSlugs } },
      options: { projection: { slug: true, price: true } },
    });

    // logger.info({ products });

    if (!products.length) {
      throw new Error(messages.CART_INVALID_PRODUCT);
    }

    const cartSummary = calculateCartSummary(cart, products as unknown as Product[]);

    // logger.info({ cartSummary });

    if (cartSummary.total !== total) {
      throw new Error(messages.CART_SUMMARY_MISMATCH);
    }

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        orderItems,
        deliveryAddress,
        ...cartSummary,
      },
    });

    return res.status(201).json(order);
  } catch (error) {
    logger.error(error);

    if (error instanceof Error) {
      if (
        error.message === messages.CART_INVALID_PRODUCT ||
        error.message === messages.CART_SUMMARY_MISMATCH ||
        error.message === messages.CART_EMPTY
      ) {
        return res.status(400).json({ message: error.message });
      }
    }

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const payOrder = async (
  { body }: NextApiRequest,
  res: NextApiResponse<OrdersResponseData>
) => {
  // TODO: validate user session
  // TODO: validate mongo id
  // TODO: cha ge to payment intent and do all the work in the BE

  try {
    const token = await getPaypalBearerToken();

    if (!token) throw new Error('Error creating Paypal token');

    const { transactionId = '', orderId = '' } = body as Record<string, string>;

    const { data } = await axios.get<PaypalOrderStatusResponse>(
      `${config.PAYPAL_URL_ORDERS}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.status !== 'COMPLETED') {
      return res.status(401).json({ message: 'Order could not be verified as completed' });
    }

    const order = await db.order.findUnique({ where: { id: orderId }, select: { total: true } });

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    if (
      order.total !== Number(data.purchase_units[0].amount.value) &&
      data.purchase_units[0].amount.currency_code === config.CURRENCY
    ) {
      return res
        .status(400)
        .json({ message: 'Amount paid through Paypal and order total is not the same' });
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        transactionId,
      },
    });

    return res.status(200).json({ message: 'Order payment is complete' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(error.response?.data);
    } else {
      logger.error(error);
    }
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};
