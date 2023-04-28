import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductsResponseData } from './productsResponseData';
import * as PS from './productsServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<ProductsResponseData>) {
  switch (req.method) {
    case 'GET':
      return PS.findAll(req, res);

    default:
      res.status(404).json({ message: 'endpoint not found' });
  }
}
