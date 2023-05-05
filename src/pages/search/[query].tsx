import { Typography } from '@mui/material';
import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';

import { findManyProducts, findProductsBySearchTerm } from '@/database';
import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';

interface SearchPageProps {
  products: Product[];
  productsCount: number;
  query: string;
}

const SearchPage = ({ products, productsCount, query }: SearchPageProps) => {
  return (
    <ShopLayout title="Teslo-Shop - Search" pageDescription="Search results for Teslo products">
      <Typography variant="h1" component="h1">
        Search
      </Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {productsCount
          ? `Found ${productsCount} product${productsCount > 1 ? 's' : ''} for "${query}"`
          : `We didn't find any products for "${query}"`}
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  );
};

export default SearchPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await findProductsBySearchTerm(query);
  const productsCount = products.length;

  // TODO: return other products when term return 0
  if (!productsCount) {
    products = await findManyProducts();
  }

  return {
    props: { products, productsCount, query },
  };
};
