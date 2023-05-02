import { Product } from '@prisma/client';
import useSWR, { Fetcher, SWRConfiguration } from 'swr';

import { productsApi } from '@/api';

export const fetcher: Fetcher<Product[], string> = (url: string) => {
  return productsApi.get(url).then((res) => res.data);
};

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR(url, config);

  return { products: data || [], isLoading: !error && !data, isError: error };
};
