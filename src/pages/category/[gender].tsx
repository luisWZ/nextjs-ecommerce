import { capitalize, Typography } from '@mui/material';
import { Gender, Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '@/layouts';
import { ProductList } from '@/products';
import { findManyProducts } from '@/server';
import { config } from '@/utils';

interface CategoryPageProps {
  products: Product[];
  gender: Gender;
}

const CategoryPage = ({ products, gender }: CategoryPageProps) => {
  const cGender = capitalize(gender);

  return (
    <ShopLayout
      title={`Teslo-Shop - ${cGender}`}
      pageDescription={`Official Teslo merchandise for ${gender}`}
    >
      <Typography variant="h1" component="h1" mb={2}>
        {cGender}
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async (_ctx) => {
  const genders = [Gender.men, Gender.women, Gender.kids];

  return {
    paths: genders.map((gender) => ({ params: { gender } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { gender } = params as { gender: Gender };

  const products = await findManyProducts({ gender });

  return products.length
    ? {
        props: { products, gender },
        revalidate: config.ONE_DAY,
      }
    : {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
};
