import { Product } from '@prisma/client';

export type ProductsResponseData = { message: string } | Partial<Product>[] | Partial<Product>;
