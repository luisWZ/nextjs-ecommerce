import { Grid, Typography } from '@mui/material';
import { useContext, /* useEffect, */ useMemo /* , useReducer */ } from 'react';

import { CartContext } from '@/context';
import { config, money } from '@/utils';

/* import {
  initializeOrderSummaryState,
  orderSummaryInitialState,
  orderSummaryReducer,
} from './orderSummaryReducer'; */

export const OrderSummary = () => {
  const { itemCount, subTotal, tax, total } = useContext(CartContext);

  /* const [{ amount, tax, total, totalItems }, dispatch] = useReducer(
    orderSummaryReducer,
    orderSummaryInitialState,
    initializeOrderSummaryState(cart)
  );

  useEffect(() => {
    dispatch({ type: 'UPDATE_STATE', payload: cart });
  }, [cart]); */

  const itemCountText = useMemo(() => `${itemCount} item${itemCount > 1 ? 's' : ''}`, [itemCount]);

  return (
    <Grid container mt={2} className="fadeIn">
      <Grid item xs={6}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{!!itemCount && itemCountText}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{money(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Tax ({config.TAX_PERCENT}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{money(tax)}</Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} mt={2} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{money(total)}</Typography>
      </Grid>
    </Grid>
  );
};
