import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/utils';

import { SearchResponseData } from './searchResponseData';
import * as SS from './searchServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<SearchResponseData>) {
  switch (req.method) {
    case 'GET':
      return SS.searchProducts(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
