import { Gender } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextApiRequest, NextApiResponse } from 'next';

import { db, logger } from '@/server';
import { messages } from '@/utils';

import { ProductsResponseData } from './productsResponseData';

const validGenders = Object.keys(Gender);

export const findAll = async (req: NextApiRequest, res: NextApiResponse<ProductsResponseData>) => {
  const { gender = 'all' } = req.query as { gender: Gender };

  let condition = {};

  if (gender !== 'all' && validGenders.includes(gender)) {
    condition = { gender: { equals: gender } };
  }

  try {
    const products = await db.product.findMany({
      where: condition,
      select: {
        slug: true,
        title: true,
        images: true,
        price: true,
        inStock: true,
      },
    });

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
    const product = await db.product.findUniqueOrThrow({
      where: { slug },
      select: {
        slug: true,
        tags: true,
        description: true,
        inStock: true,
        price: true,
        sizes: true,
        title: true,
        type: true,
        gender: true,
        images: true,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === 'P2025') {
      return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND });
    }

    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

// export const findAll = async (req: NextApiRequest, res: NextApiResponse<ProductResponseData>) => {};
