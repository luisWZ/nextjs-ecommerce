import { Typography } from '@mui/material';
import { Gender, Product } from '@prisma/client';

import { useFetchApi } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { routes } from '@/lib';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';

const MenPage = () => {
  const { data: products, isLoading } = useFetchApi<Product[]>({
    url: `${routes.API_PRODUCTS}?gender=${Gender.men}`,
    emptyDataType: [],
  });

  return (
    <ShopLayout title="Teslo-Shop - Men" pageDescription="Official Teslo merchandise for men">
      <Typography variant="h1" component="h1" mb={2}>
        Men
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
