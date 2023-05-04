import { Typography } from '@mui/material';
import { Gender, Product } from '@prisma/client';

import { useFetchApi } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';

const WomenPage = () => {
  const { data: products, isLoading } = useFetchApi<Product[]>({
    url: `/products?gender=${Gender.women}`,
    emptyDataType: [],
  });

  return (
    <ShopLayout title="Teslo-Shop - Women" pageDescription="Official Teslo merchandise for women">
      <Typography variant="h1" component="h1" mb={2}>
        Women
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
