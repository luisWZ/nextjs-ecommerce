import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/lib';

import { AdminResponseData } from './adminResponseData';
import * as AS from './adminServices';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<AdminResponseData>) {
  switch (req.method) {
    case 'POST':
      return AS.uploadImages(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
