import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '@/components/layouts';
import { ItemCounter } from '@/components/ui';
import { findManyProductslugs, findProductBySlug } from '@/database';
import { useProductDetailPage } from '@/hooks';
import { ProductSlideshow, SizeSelector } from '@/products';
import { config, routes } from '@/utils';

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const { description, images, title, price, sizes } = product;

  const { tempCartProduct, maxStock, modifyQuantity, onSelectedSize, onClickAddToCart } =
    useProductDetailPage(product);

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

              <ItemCounter
                quantity={tempCartProduct.quantity ?? 0}
                modifyQuantity={modifyQuantity}
              />

              {maxStock ? (
                <SizeSelector
                  onSelectedSize={onSelectedSize}
                  selectedSize={tempCartProduct.size}
                  sizes={sizes}
                />
              ) : null}
            </Box>

            {maxStock ? (
              <Button onClick={onClickAddToCart} color="secondary" className="circular-btn">
                {tempCartProduct.size ? 'Add to cart' : 'Select size'}
              </Button>
            ) : (
              <Chip label="Product is Out of Stock" color="error" variant="outlined" />
            )}

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
          destination: routes.PAGE_HOME,
          permanent: false,
        },
      };
};
