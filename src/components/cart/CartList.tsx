import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import { mockData } from '@/interfaces';

import { ItemCounter } from '../ui';

const productsInCart = mockData.products.slice(0, 3);

interface CartListProps {
  editable?: boolean;
}

export const CartList = ({ editable = false }: CartListProps) => {
  return (
    <>
      {productsInCart.map((p) => (
        <Grid container spacing={2} mb={1} key={p.slug}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${p.images[0]}`}
                    component="img"
                    sx={{ borderRadius: '4px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{p.title}</Typography>
              <Typography variant="body1">
                Size: <small>M</small>
              </Typography>

              {editable ? <ItemCounter /> : <Typography>3</Typography>}
            </Box>
          </Grid>
          <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
            <Typography variant="subtitle1">
              {'$'}
              {p.price}
            </Typography>
            {editable ? (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            ) : null}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
