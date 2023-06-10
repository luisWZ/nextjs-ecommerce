import { Address, OrderItem, Prisma } from '@prisma/client';
import isMongoId from 'validator/lib/isMongoId';

import { CartSummary } from '@/interface';

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

export const findAllOrders = async () => {
  return db.order.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      total: true,
      itemCount: true,
      isPaid: true,
      createdAt: true,
      User: { select: { email: true, name: true } },
    },
  });
};

export const findOrderByIdAndUserId = async (id: string, userId: string) => {
  if (!isMongoId(id)) return null;
  if (!isMongoId(userId)) return null;

  return db.order.findFirst({ where: { id, userId }, select: selectOrder });
};

export const findOrdeById = async (id: string) => {
  if (!isMongoId(id)) return null;

  return db.order.findFirst({ where: { id }, select: selectOrder });
};

export const findOrdersByUserId = async (userId: string) => {
  if (!isMongoId(userId)) return [];

  return db.order.findMany({
    where: { userId },
    select: { id: true, isPaid: true, deliveryAddress: true },
  });
};

export const findOrderTotal = (id: string) => {
  if (!isMongoId(id)) return null;

  return db.order.findUnique({ where: { id }, select: { total: true } });
};

export const findOrderMarkAsPaid = ({ id, transactionId }: Record<string, string>) => {
  return db.order.update({
    where: { id },
    data: {
      isPaid: true,
      transactionId,
    },
  });
};

export const createOrder = ({
  userId,
  orderItems,
  deliveryAddress,
  cartSummary,
}: {
  userId: string;
  orderItems: OrderItem[];
  deliveryAddress: Address;
  cartSummary: CartSummary;
}) => {
  return db.order.create({
    data: {
      userId,
      orderItems,
      deliveryAddress,
      ...cartSummary,
    },
  });
};

export const countAllOrders = () => db.order.count();

export const countPaidOrders = () => db.order.count({ where: { isPaid: true } });
