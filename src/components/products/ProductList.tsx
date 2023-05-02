import { Grid } from '@mui/material';
import { Product } from '@prisma/client';

import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
