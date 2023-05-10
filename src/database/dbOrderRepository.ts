import { Prisma } from '@prisma/client';
import isMongoId from 'validator/lib/isMongoId';

import { db } from './db';

type SelectOrder = Required<
  Pick<
    Prisma.OrderSelect,
    | 'id'
    | 'userId'
    | 'orderItems'
    | 'deliveryAddress'
    | 'itemCount'
    | 'subTotal'
    | 'tax'
    | 'total'
    | 'isPaid'
  >
>;
const selectOrder: SelectOrder = {
  id: true,
  userId: true,
  orderItems: true,
  deliveryAddress: true,
  itemCount: true,
  subTotal: true,
  tax: true,
  total: true,
  isPaid: true,
};

export const findOrderByIdAndUserId = async (id: string, userId: string) => {
  if (!isMongoId(id)) return null;
  if (!isMongoId(userId)) return null;

  return db.order.findFirst({ where: { id, userId }, select: selectOrder });
};

export const findOrdersByUserId = async (userId: string) => {
  if (!isMongoId(userId)) return [];

  return db.order.findMany({
    where: { userId },
    select: { id: true, isPaid: true, deliveryAddress: true },
  });
};
