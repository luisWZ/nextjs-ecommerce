import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { CartList, OrderSummary } from '@/cart';
import { ShopLayout } from '@/layouts';

const CartPage = () => {
  return (
    <ShopLayout title="Cart — 3" pageDescription="Your Teslo Shop shopping cart">
      <Typography variant="h1" component="h1" mb={2}>
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box mt={3}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
