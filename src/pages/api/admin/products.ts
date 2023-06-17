import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/lib';

import { AdminResponseData } from './adminResponseData';
import * as AS from './adminServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<AdminResponseData>) {
  switch (req.method) {
    case 'GET':
      return AS.getProducts(req, res);

    case 'POST':
      return AS.createProduct(req, res);

    case 'PUT':
      return AS.updateProduct(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
