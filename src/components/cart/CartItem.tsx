import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';

import { CartContext } from '@/context';
import { Cart } from '@/interface';
import { ItemCounter } from '@/ui';
import { config, moneyNoCents } from '@/utils';

interface CartItemProps {
  item: Cart;
  editable: boolean;
}

export const CartItem = ({ item, editable }: CartItemProps) => {
  const { cart, cartRemoveProduct, cartStockAvailablePerItem, cartModifyItemQuantity } =
    useContext(CartContext);

  const { slug, image, title, size, price /* , inStock */ } = item;

  const maxStock = useMemo(
    () => cartStockAvailablePerItem(slug),
    [cartStockAvailablePerItem, slug]
  );

  const [quantity, setQuantity] = useState(item.quantity);
  const [stockAvailable, setStockAvailable] = useState(maxStock());

  useEffect(() => {
    setStockAvailable(maxStock());
  }, [cart, maxStock]);

  const modifyQuantity = (operation: '-' | '+') => {
    return operation === '-'
      ? () => {
          if (quantity <= 1) return;
          const newQuantity = quantity - 1;
          setQuantity(newQuantity);
          cartModifyItemQuantity(newQuantity, { slug, size });
        }
      : () => {
          if (!stockAvailable || quantity === config.MAX_CART_ITEMS_PER_SIZE) return;
          const newQuantity = quantity + 1;
          setQuantity(newQuantity);
          cartModifyItemQuantity(newQuantity, { slug, size });
        };
  };

  return (
    <Grid container spacing={2} mb={1} className="fadeIn">
      <Grid item xs={3}>
        <NextLink href={`/product/${slug}`} passHref legacyBehavior>
          <Link>
            <CardActionArea>
              <CardMedia
                image={`/products/${image}`}
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
            <Typography>{quantity}</Typography>
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
