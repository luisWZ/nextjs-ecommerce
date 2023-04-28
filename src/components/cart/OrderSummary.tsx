import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container mt={2}>
      <Grid item xs={6}>
        <Typography>Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {'$'}
          {'300'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Tax (8%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {'$'}
          {'300'}
        </Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} mt={2} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {'$'}
          {'300'}
        </Typography>
      </Grid>
    </Grid>
  );
};
