import { Order } from '@prisma/client';

import { UserData } from '@/interface';

export type AdminResponseData =
  | { message: string }
  | {
      ordersTotal: number;
      ordersPaid: number;
      ordersPending: number;
      clientsTotal: number;
      productsTotal: number;
      productsOutOfStock: number;
      productsLowStock: number;
    }
  | UserData[]
  | Order[];
