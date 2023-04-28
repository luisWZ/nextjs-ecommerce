import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';

import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';

const OrderByIdPage = () => {
  return (
    <ShopLayout title="Review order 2132139120391 " pageDescription="Order summary page">
      <Typography variant="h1" component="h1" mb={2}>
        Order: 21331231
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      {/* <Chip sx={{my:2}} label='Purchase completed ' variant='outlined' color="success" icon={<CreditScoreOutlined />} /> */}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Review (3 products) </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">Delivery address</Typography>
                {/* <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink> */}
              </Box>

              <Typography>Luis Lasso</Typography>
              <Typography>Av. Siempre Viva 456</Typography>
              <Typography>Depto 31</Typography>
              <Typography>La Chingada, Veracruz</Typography>
              <Typography>C.P. 91234</Typography>
              <Typography>+52 55 1234 5678</Typography>
              <Divider sx={{ my: 1 }} />

              {/* <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box> */}

              <OrderSummary />

              <Box mt={3}>
                <Typography variant="h1">Pay</Typography>
                <Chip
                  sx={{ my: 2 }}
                  label="Purchase completed "
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderByIdPage;
