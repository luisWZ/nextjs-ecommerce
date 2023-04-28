import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { mockData } from '@/interfaces';
import { ShopLayout } from '@/layouts';
import { ProductSlideshow, SizeSelector } from '@/products';
import { ItemCounter } from '@/ui';

const p = mockData.products[0];

const ProductDetailPage = () => {
  return (
    <ShopLayout title={p.title} pageDescription={p.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={p.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {p.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {'$'}
              {p.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter />
              <SizeSelector sizes={p.sizes} />
            </Box>
            {/* Add t cart */}
            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* <Chip label='Product is unavailable' color='error' variant='outlined' /> */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{p.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductDetailPage;
