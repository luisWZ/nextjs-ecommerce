import { Typography } from '@mui/material';
import { Gender } from '@prisma/client';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { FullScreenLoading } from '@/ui';

const WomenPage = () => {
  const { products, isLoading } = useProducts(`/products?gender=${Gender.women}`);

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
