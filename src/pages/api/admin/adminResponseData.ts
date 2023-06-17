import type { Order, Product } from '@prisma/client';

import type { UserData } from '@/interface';

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
  | Order[]
  | Product[]
  | Product
  | { image: string };
