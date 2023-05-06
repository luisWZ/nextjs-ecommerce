import pino from 'pino';

import { config } from './config';

const options = {
  transport: { target: 'pino-pretty', options: { colorize: true } },
};

export const logger = config.NODE_ENV === 'development' ? pino(options) : pino();
