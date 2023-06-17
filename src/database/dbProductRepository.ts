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
  slug: true,
  title: true,
  price: true,
  description: true,
  images: true,
  inStock: true,
  gender: true,
  sizes: true,
  tags: true,
  type: true,
};

export const findManyProductslugs = async () => {
  return db.product.findMany({
    select: {
      slug: true,
    },
  });
};

export const findManyProductsSortByTitle = async () => {
  return db.product.findMany({
    orderBy: { title: 'asc' },
    select: {
      id: true,
      slug: true,
      images: true,
      title: true,
      gender: true,
      type: true,
      inStock: true,
      price: true,
      sizes: true,
    },
  });
};

export const findManyProductsBySearchTerm = async (query: string) => {
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

export const findProductById = async (id: string) => {
  return db.product.findFirst({
    where: { id },
    select: { ...selectProductDetails, id: true },
  });
};

export const findManyProductsPriceBySlug = (productSlugs: string[]) => {
  return db.product.findRaw({
    filter: { slug: { $in: productSlugs } },
    options: { projection: { slug: true, price: true } },
  });
};

export const findProductImages = (id: string) => {
  return db.product.findUnique({ where: { id }, select: { images: true } });
};

export const updateOneProduct = async (id: string, data: Prisma.ProductUpdateInput) => {
  return db.product.update({ where: { id }, data });
};

export const createOneProduct = (data: Prisma.ProductCreateInput) => {
  return db.product.create({ data });
};

export const countAllProducts = () => db.product.count();

export const countOutOfStockProducts = () => db.product.count({ where: { inStock: 0 } });

export const countLowStockProducts = () => db.product.count({ where: { inStock: { lte: 10 } } });
