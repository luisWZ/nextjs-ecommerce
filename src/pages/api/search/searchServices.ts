import { NextApiRequest, NextApiResponse } from 'next';

import { findProductsBySearchTerm } from '@/database';
import { logger } from '@/lib';
import { messages } from '@/lib';

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
    const products = await findProductsBySearchTerm(q);
    return res.status(200).json(products);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};
