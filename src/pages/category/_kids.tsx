import { Typography } from '@mui/material';
import { Gender } from '@prisma/client';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';

const KidsPage = () => {
  const { products, isLoading } = useProducts(`/products?gender=${Gender.kids}`);

  return (
    <ShopLayout title="Teslo-Shop - Kids" pageDescription="Official Teslo merchandise for kids">
      <Typography variant="h1" component="h1" mb={2}>
        Kids
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsPage;
