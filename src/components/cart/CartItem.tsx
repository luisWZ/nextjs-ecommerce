import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import { useCartItem } from '@/hooks';
import { Cart } from '@/interface';
import { routes } from '@/lib';
import { ItemCounter } from '@/ui';
import { moneyNoCents } from '@/utils';

interface CartItemProps {
  item: Cart;
  editable: boolean;
}

export const CartItem = ({ item, editable }: CartItemProps) => {
  const { slug, image, title, size, price /* , inStock */ } = item;

  const { cartRemoveProduct, quantity, modifyQuantity } = useCartItem({
    size,
    slug,
    quantity: item.quantity,
  });

  return (
    <Grid container spacing={2} mb={1} className="fadeIn">
      <Grid item xs={3}>
        <NextLink href={`${routes.PAGE_PRODUCT}/${slug}`} passHref legacyBehavior>
          <Link>
            <CardActionArea>
              <CardMedia
                image={`${routes.PUBLIC_PRODUCTS}/${image}`}
                component="img"
                sx={{ borderRadius: '4px' }}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Grid>
      <Grid item xs={7}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{title}</Typography>

          {/* <Typography variant="body1">inStock: {inStock}</Typography> */}
          {/* <Typography variant="body1">stockAvailable: {stockAvailable}</Typography> */}

          <Typography variant="body1">
            Size: <small style={{ fontWeight: 'bold' }}>{size}</small>
          </Typography>

          {editable ? (
            <ItemCounter modifyQuantity={modifyQuantity} quantity={quantity} />
          ) : (
            <Typography>
              {quantity} {quantity > 1 ? 'items' : 'item'}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="subtitle1">{moneyNoCents(price)}</Typography>
        {editable ? (
          <Button onClick={cartRemoveProduct(item)} variant="text" color="secondary">
            Remove
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};
