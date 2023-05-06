import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { CartList, OrderSummary } from '@/cart';
import { CartContext } from '@/context';
import { ShopLayout } from '@/layouts';
import { routes } from '@/lib';
import { FullScreenLoading } from '@/ui';

const CartPage = () => {
  const { cart, itemCount, isInitialized } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !cart.length) {
      router.replace(routes.PAGE_CART_EMPTY);
    }
  }, [cart.length, isInitialized, router]);

  if (!isInitialized || !cart.length) {
    return <FullScreenLoading />;
  }

  return (
    <ShopLayout
      title={`Teslo Cart${!!itemCount ? `: ${itemCount} product${itemCount > 1 ? 's' : ''}` : ''}`}
      pageDescription="Your Teslo Shop shopping cart"
    >
      <Typography variant="h1" component="h1" mb={2}>
        Cart
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card fadeIn">
            <CardContent>
              <Typography variant="h2">Order</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box mt={3}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href={routes.PAGE_CHECKOUT_ADDRESS}
                >
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
