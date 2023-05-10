import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/lib';

import { OrdersResponseData } from './ordersResponseData';
import * as OS from './ordersServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<OrdersResponseData>) {
  switch (req.method) {
    case 'POST':
      return OS.createOneOrder(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
