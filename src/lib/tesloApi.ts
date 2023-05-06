import axios from 'axios';

import { routes } from '@/utils';

export const tesloApi = axios.create({
  baseURL: routes.API_BASE_URL,
});
