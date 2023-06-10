import { Order, Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import isMongoId from 'validator/lib/isMongoId';

import {
  countAllOrders,
  countAllProducts,
  countAllUsers,
  countLowStockProducts,
  countOutOfStockProducts,
  countPaidOrders,
  findAllOrders,
  findAllUsers,
  updateUserRole,
} from '@/database';
import { logger, messages } from '@/lib';

import { AdminResponseData } from './adminResponseData';

const rolesArray = Object.values(Role);

export const findDahboardInfo = async (
  _req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  try {
    const ordersTotalPromise = countAllOrders();
    const ordersPaidPromise = countPaidOrders();
    const clientsTotalPromise = countAllUsers();
    const productsTotalPromise = countAllProducts();
    const productsOutOfStockPromise = countOutOfStockProducts();
    const productsLowStockPromise = countLowStockProducts();

    const [
      ordersTotal,
      ordersPaid,
      clientsTotal,
      productsTotal,
      productsOutOfStock,
      productsLowStock,
    ] = await Promise.all([
      ordersTotalPromise,
      ordersPaidPromise,
      clientsTotalPromise,
      productsTotalPromise,
      productsOutOfStockPromise,
      productsLowStockPromise,
    ]);

    const ordersPending = ordersTotal - ordersPaid;

    return res.status(200).json({
      ordersTotal,
      ordersPaid,
      ordersPending,
      clientsTotal,
      productsTotal,
      productsOutOfStock,
      productsLowStock,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const getUsers = async (_req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  const { userId = '', role = '' } = req.body;

  try {
    if (!isMongoId(userId)) {
      throw Error(`${messages.USER_NOT_FOUND} [${userId}]`);
    }

    if (!rolesArray.includes(role)) {
      throw Error(`${messages.ROLE_INVALID} [${role}]`);
    }

    await updateUserRole(userId, role);

    return res.status(200).json({ message: messages.USER_ROLE_UPDATED });
  } catch (error) {
    logger.error(error);

    if ((error as Error).message.startsWith(messages.ROLE_INVALID)) {
      return res.status(400).json({ message: (error as Error).message });
    }
    if ((error as Error).message.startsWith(messages.USER_NOT_FOUND)) {
      return res.status(404).json({ message: (error as Error).message });
    }

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const getOrders = async (_req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  try {
    const orders = (await findAllOrders()) as unknown as Order[];

    return res.status(200).json(orders);
  } catch (error) {
    logger.error(error);

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};
