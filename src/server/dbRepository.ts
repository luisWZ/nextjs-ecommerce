import { Prisma } from '@prisma/client';

import { db } from './db';

const selectProductList: Prisma.ProductSelect = {
  slug: true,
  title: true,
  price: true,
  inStock: true,
  images: true,
};

const selectProductDetails: Prisma.ProductSelect = {
  title: true,
  price: true,
  description: true,
  images: true,
  inStock: true,
  sizes: true,
};

export const findManyProductslugs = async () => {
  return db.product.findMany({
    select: {
      slug: true,
    },
  });
};

export const findProductsBySearchTerm = async (query: string) => {
  return db.product.findMany({
    where: {
      OR: [
        { tags: { has: query.toLowerCase() } },
        { slug: { contains: query, mode: 'insensitive' } },
        { title: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: selectProductList,
  });
};

export const findManyProducts = async (
  condition: Prisma.ProductWhereInput = {},
  select: 'list' | 'details' = 'list'
) => {
  return db.product.findMany({
    where: condition,
    select: select === 'list' ? selectProductList : selectProductDetails,
  });
};

export const findProductBySlugOrThrow = (slug: string) => {
  return db.product.findUniqueOrThrow({
    where: { slug },
    select: selectProductDetails,
  });
};

export const findProductBySlug = async (slug: string) => {
  return db.product.findFirst({
    where: { slug },
    select: selectProductDetails,
  });
};
