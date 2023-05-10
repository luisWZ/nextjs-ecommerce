import { Order } from '@prisma/client';

export type OrdersResponseData = { message: string } | Order;
