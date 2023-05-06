import axios from 'axios';

import { routes } from './config';

export const tesloApi = axios.create({
  baseURL: routes.API_BASE_URL,
});
