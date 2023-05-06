import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';

import { CartList, OrderSummary } from '@/cart';
import { FullScreenLoading } from '@/components/ui';
import { CartContext } from '@/context';
import { ShopLayout } from '@/layouts';
import { routes } from '@/utils';

const SummaryPage = () => {
  const { itemCount, isLoadingDeliveryAddress, deliveryAddress } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoadingDeliveryAddress) return;
    if (deliveryAddress.address === undefined) {
      router.replace(routes.PAGE_CHECKOUT_ADDRESS);
    }
  }, [isLoadingDeliveryAddress, deliveryAddress, router]);

  const productCountText = useMemo(
    () => `${itemCount} product${itemCount > 1 ? 's' : ''}`,
    [itemCount]
  );

  if (isLoadingDeliveryAddress || deliveryAddress.address === undefined)
    return <FullScreenLoading />;

  return (
    <ShopLayout
      title={`Order review${!!itemCount ? `: ${productCountText}` : ''}`}
      pageDescription="Order summary page"
    >
      <Typography variant="h1" component="h1" mb={2}>
        Summary
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Review Order</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">Delivery address</Typography>
                <NextLink href={routes.PAGE_CHECKOUT_ADDRESS} passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>

              <Typography>
                {deliveryAddress?.firstName} {deliveryAddress?.lastName}
              </Typography>
              <Typography>{deliveryAddress?.address}</Typography>
              <Typography>{deliveryAddress?.address_2}</Typography>
              <Typography>
                {deliveryAddress?.city}, {deliveryAddress.country}
              </Typography>
              <Typography>{deliveryAddress?.zipCode}</Typography>
              <Typography>{deliveryAddress?.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">{productCountText}</Typography>
                <NextLink href={routes.PAGE_CART} passHref legacyBehavior>
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
