import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';

import { OrderList, OrderSummary } from '@/cart';
import { FullScreenLoading } from '@/components/ui';
import { CartContext } from '@/context';
import { ShopLayout } from '@/layouts';
import { routes } from '@/lib';

const SummaryPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const { itemCount, isLoadingDeliveryAddress, deliveryAddress, cartCreateOrder, isCreatingOrder } =
    useContext(CartContext);

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

  const onClickCreateOrder = useMemo(
    () => async () => {
      const { order, error } = await cartCreateOrder();

      if (error) {
        return setErrorMessage(error);
      }

      router.replace(`/orders/${order!.id}`);
    },
    [cartCreateOrder, router]
  );

  if (isLoadingDeliveryAddress || deliveryAddress.address === undefined) {
    return <FullScreenLoading />;
  }

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
          <OrderList />
        </Grid>
        <Grid item xs={12} sm={5}>
          {!isCreatingOrder ? (
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

                <Box mt={3} display="flex" flexDirection="column">
                  <Button
                    disabled={isCreatingOrder}
                    onClick={onClickCreateOrder}
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                  >
                    Confirm Order
                  </Button>

                  <Chip
                    color="error"
                    label={errorMessage}
                    sx={{ mt: 2, display: errorMessage ? 'flex' : 'none' }}
                  />
                </Box>
              </CardContent>
            </Card>
          ) : (
            <FullScreenLoading text="placing order" size={2} />
          )}
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
