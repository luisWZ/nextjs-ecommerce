import { CreditCardOffOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Order } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useMemo } from 'react';

import { OrderList, OrderSummary } from '@/cart';
import { findOrdeById } from '@/database';
import { AdminLayout } from '@/layouts';
import { routes } from '@/lib';

interface OrderByIdPageProps {
  order: Order;
}

const AdminOrderDetailsPage = ({ order }: OrderByIdPageProps) => {
  const { id, isPaid, itemCount, deliveryAddress, orderItems} = order;

  const productCountText = useMemo(
    () => `${itemCount} product${itemCount > 1 ? 's' : ''}`,
    [itemCount]
  );

  return (
    <AdminLayout title="Order" subtitle={`ID: ${id}`} icon={<CreditCardOutlined />}>
      <Grid container mt={4}>
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
              {/* TODO: Add purchase date instead of null */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminOrderDetailsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query as { id: string };
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `${routes.PAGE_LOGIN}?page=${routes.PAGE_ADMIN_ORDERS}/${id}`,
        permanent: false,
      },
    };
  }

  const order = await findOrdeById(id);

  return order
    ? {
        props: { order },
      }
    : {
        redirect: {
          destination: routes.PAGE_ADMIN,
          permanent: false,
        },
      };
};
