import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/utils';

import { SearchResponseData } from './searchResponseData';

export default function handler(req: NextApiRequest, res: NextApiResponse<SearchResponseData>) {
  switch (req.method) {
    default:
      res.status(400).json({ message: messages.SEARCH_QUERY_ERROR });
  }
}
