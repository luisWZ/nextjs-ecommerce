import { OrderItem, Product } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { db } from '@/database';
import { Cart, CartState } from '@/interface';
import { config, logger, messages } from '@/lib';

import { OrdersResponseData } from './ordersResponseData';
import { calculateCartSummary } from './ordersServicesHelpers';

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
