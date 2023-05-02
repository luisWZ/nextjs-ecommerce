import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/utils';

import { UserResponseData } from './userResponseData';
import * as US from './userServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<UserResponseData>) {
  switch (req.method) {
    case 'POST':
      return US.userLogin(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
