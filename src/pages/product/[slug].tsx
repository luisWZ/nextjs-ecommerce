import { Box, Button, Grid, Typography } from '@mui/material';
import { Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '@/components/layouts';
import { ItemCounter } from '@/components/ui';
import { ProductSlideshow, SizeSelector } from '@/products';
import { findManyProductslugs, findProductBySlug } from '@/server';
import { config } from '@/utils';

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const { description, images, title, price, sizes } = product;

  return (
    <ShopLayout title={title} pageDescription={description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {'$'}
              {price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter />
              <SizeSelector sizes={sizes} />
            </Box>
            {/* Add t cart */}
            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* <Chip label='Product is unavailable' color='error' variant='outlined' /> */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async (_ctx) => {
  const products = await findManyProductslugs();

  return {
    paths: products.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await findProductBySlug(slug);

  return product
    ? {
        props: { product },
        revalidate: config.ONE_DAY,
      }
    : {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
};
