import { Grid, Typography } from '@mui/material';
import { Order } from '@prisma/client';
import { useContext, useMemo } from 'react';

import { CartContext } from '@/context';
import { config } from '@/lib';
import { money } from '@/utils';

interface OrderSummaryProps {
  order?: Order;
}

export const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { itemCount, subTotal, tax, total } = useContext(CartContext);

  const orderSummary = order ? order : { itemCount, subTotal, tax, total };

  const itemCountText = useMemo(
    () => `${orderSummary.itemCount} item${orderSummary.itemCount > 1 ? 's' : ''}`,
    [orderSummary.itemCount]
  );

  return (
    <Grid container mt={2} className="fadeIn">
      <Grid item xs={6} mt={0.5}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" mt={0.5}>
        <Typography>{!!orderSummary.itemCount && itemCountText}</Typography>
      </Grid>
      <Grid item xs={6} mt={1}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" mt={1}>
        <Typography>{money(orderSummary.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6} mt={1}>
        <Typography>Tax ({config.TAX_PERCENT}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" mt={1}>
        <Typography>{money(orderSummary.tax)}</Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} mt={2} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{money(orderSummary.total)}</Typography>
      </Grid>
    </Grid>
  );
};
