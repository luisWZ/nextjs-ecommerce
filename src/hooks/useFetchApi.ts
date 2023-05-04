import { Product } from '@prisma/client';
import useSWR, { Fetcher, SWRConfiguration } from 'swr';

import { tesloApi } from '@/api';

export const fetcher: Fetcher<Product[], string> = (url: string) => {
  return tesloApi.get(url).then((res) => res.data);
};

export const useFetchApi = <T>({
  url,
  config = {},
  emptyDataType,
}: {
  url: string;
  config?: SWRConfiguration;
  emptyDataType: unknown;
}) => {
  const { data, error } = useSWR(url, config);

  return { data: (data ?? emptyDataType) as T, isLoading: !error && !data, isError: error };
};
