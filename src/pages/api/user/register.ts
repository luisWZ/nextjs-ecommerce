import type { NextApiRequest, NextApiResponse } from 'next';

import { messages } from '@/lib';

import { UserResponseData } from './userResponseData';
import * as US from './userServices';

export default function handler(req: NextApiRequest, res: NextApiResponse<UserResponseData>) {
  switch (req.method) {
    case 'POST':
      return US.userRegister(req, res);

    default:
      res.status(404).json({ message: messages.ENDPOINT_NOT_FOUND });
  }
}
