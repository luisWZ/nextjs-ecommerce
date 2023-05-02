import { Typography } from '@mui/material';
import { Gender } from '@prisma/client';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';

const MenPage = () => {
  const { products, isLoading } = useProducts(`/products?gender=${Gender.men}`);

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
