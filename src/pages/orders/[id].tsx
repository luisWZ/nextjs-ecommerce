import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Order } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { OrderList, OrderSummary } from '@/cart';
import { findOrderByIdAndUserId } from '@/database';
import { PaypalOrderBodyResponse } from '@/interface';
import { ShopLayout } from '@/layouts';
import { routes, tesloApi } from '@/lib';

interface OrderByIdPageProps {
  order: Order;
}

const OrderByIdPage = ({ order }: OrderByIdPageProps) => {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const { id, isPaid, itemCount, deliveryAddress, orderItems, total } = order;

  const onOrderCompleted = async (details: PaypalOrderBodyResponse) => {
    if (details.status !== 'COMPLETED') {
      return alert('Please try again'); // could improve
    }

    setIsPaying(true);

    try {
      await tesloApi.post(routes.API_ORDERS_PAY, {
        transactionId: details.id,
        orderId: id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.error(error);
      alert('Please try again'); // could improve
    }
  };

  const productCountText = useMemo(
    () => `${itemCount} product${itemCount > 1 ? 's' : ''}`,
    [itemCount]
  );

  return (
    <ShopLayout title="Review order" pageDescription="Order summary page">
      <Typography variant="h1" component="h1" mb={2}>
        Order: {id}
      </Typography>

      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Payment completed "
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Payment pending"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <OrderList orderItems={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order Summary</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">Delivery address</Typography>
              </Box>

              <Typography>
                {deliveryAddress.firstName} {deliveryAddress.lastName}
              </Typography>
              <Typography>{deliveryAddress.address}</Typography>
              <Typography>{deliveryAddress.address_2}</Typography>
              <Typography>
                {deliveryAddress.city}, {deliveryAddress.country}
              </Typography>
              <Typography>{deliveryAddress.zipCode}</Typography>
              <Typography>{deliveryAddress.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">{productCountText}</Typography>
              </Box>

              <OrderSummary order={order} />

              {!isPaid ? (
                <Box mt={3}>
                  {isPaying ? (
                    <Box display="flex" justifyContent="center" className="fadeIn">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <PayPalButtons
                      createOrder={(_data, actions) =>
                        actions.order.create({
                          purchase_units: [{ amount: { value: `${total}` } }],
                        })
                      }
                      onApprove={(_data, actions) =>
                        actions.order!.capture().then(onOrderCompleted)
                      }
                    />
                  )}
                </Box>
              ) : null}
              {/* TODO: Add purchase date instead of null */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderByIdPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query as { id: string };
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `${routes.PAGE_LOGIN}?page=${routes.PAGE_ORDERS}/${id}`,
        permanent: false,
      },
    };
  }

  const order = await findOrderByIdAndUserId(id, session.user.id);

  return order && order.userId === session.user.id
    ? {
        props: { order },
      }
    : {
        redirect: {
          destination: routes.PAGE_ORDERS_HISTORY,
          permanent: false,
        },
      };
};
