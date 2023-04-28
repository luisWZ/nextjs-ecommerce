import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import { CartList, OrderSummary } from '@/cart';
import { ShopLayout } from '@/layouts';

const SummaryPage = () => {
  return (
    <ShopLayout title="Order review — 3" pageDescription="Order summary page">
      <Typography variant="h1" component="h1" mb={2}>
        Summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Review (3 products) </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems='baseline'>
                <Typography variant="subtitle1">Delivery address</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>Luis Lasso</Typography>
              <Typography>Av. Siempre Viva 456</Typography>
              <Typography>Depto 31</Typography>
              <Typography>La Chingada, Veracruz</Typography>
              <Typography>C.P. 91234</Typography>
              <Typography>+52 55 1234 5678</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box mt={3}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
