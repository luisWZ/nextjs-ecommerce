import { Typography } from '@mui/material';

import { mockData } from '@/interfaces';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';

export default function Home() {
  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Official Teslo merchandise">
      <Typography variant="h1" component="h1">
        Store
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>

      <ProductList products={mockData.products} />
    </ShopLayout>
  );
}
