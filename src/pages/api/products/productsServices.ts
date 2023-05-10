import { Gender, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextApiRequest, NextApiResponse } from 'next';

import { findManyProducts, findProductBySlugOrThrow } from '@/database';
import { logger } from '@/lib';
import { messages } from '@/lib';

import { ProductsResponseData } from './productsResponseData';

const validGenders = Object.keys(Gender);

export const findAll = async (req: NextApiRequest, res: NextApiResponse<ProductsResponseData>) => {
  const { gender = 'all' } = req.query as { gender: Gender };

  let condition: Prisma.ProductWhereInput = {};

  if (gender !== 'all' && validGenders.includes(gender)) {
    condition = { gender: { equals: gender } };
  }

  try {
    const products = await findManyProducts(condition);

    return res.status(200).json(products);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const findBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsResponseData>
) => {
  const { slug } = req.query as { slug: string };

  if (!slug) {
    return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND });
  }

  try {
    const product = await findProductBySlugOrThrow(slug);

    return res.status(200).json(product);
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === 'P2025') {
      return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND });
    }

    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

// export const findAll = async (req: NextApiRequest, res: NextApiResponse<ProductsResponseData>) => {};
