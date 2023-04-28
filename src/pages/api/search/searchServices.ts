import { NextApiRequest, NextApiResponse } from 'next';

import { db, logger } from '@/server';
import { messages } from '@/utils';

import { SearchResponseData } from './searchResponseData';

export const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchResponseData>
) => {
  const { q = '' } = req.query as { q: string };

  if (!q.length) {
    return res.status(400).json({ message: messages.SEARCH_QUERY_ERROR });
  }

  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          { tags: { has: q.toLowerCase() } },
          { slug: { contains: q, mode: 'insensitive' } },
          { title: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        slug: true,
        title: true,
        price: true,
        inStock: true,
        images: true,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};
