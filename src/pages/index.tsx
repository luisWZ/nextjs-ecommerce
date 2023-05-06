import { Typography } from '@mui/material';
import { Product } from '@prisma/client';

import { useFetchApi } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';
import { routes } from '@/utils';

export default function Home() {
  const { data: products, isLoading } = useFetchApi<Product[]>({
    url: routes.API_PRODUCTS,
    emptyDataType: [],
  });

  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Official Teslo merchandise">
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        All products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
