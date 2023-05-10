import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import { routes } from '@/lib';
import { ItemCounter } from '@/ui';
import { moneyNoCents } from '@/utils';

interface ItemUiProps {
  item: {
    slug: string;
    image: string;
    title: string;
    size?: string;
    price: number;
    quantity: number;
  };
  itemType: 'CART' | 'ORDER_ITEM';
  editable?: boolean;
  modifyQuantity?: (operation: '-' | '+') => () => void;
  cartRemoveProduct?: (item: { slug: string; size: string }) => () => void;
}

export const ItemUi = ({
  item,
  itemType,
  editable = false,
  modifyQuantity,
  cartRemoveProduct,
}: ItemUiProps) => {
  const { slug, image, title, size = '', price, quantity } = item;

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

          <Typography variant="body1">
            Size: <small style={{ fontWeight: 'bold' }}>{size}</small>
          </Typography>

          {editable && itemType === 'CART' ? (
            <ItemCounter modifyQuantity={modifyQuantity!} quantity={quantity} />
          ) : (
            <Typography>
              {quantity} {quantity > 1 ? 'items' : 'item'}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="subtitle1">{moneyNoCents(price)}</Typography>
        {editable && itemType === 'CART' ? (
          <Button onClick={cartRemoveProduct!({ size, slug })} variant="text" color="secondary">
            Remove
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};
