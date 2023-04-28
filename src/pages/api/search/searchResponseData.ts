import { Product } from '@prisma/client';

export type SearchResponseData = { message: string } | Partial<Product>[];
