import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef /* , GridRowProps, GridValueGetterParams */ } from '@mui/x-data-grid';
import { Order } from '@prisma/client';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next/types';
import { getSession } from 'next-auth/react';

import { findOrdersByUserId } from '@/database';
import { ShopLayout } from '@/layouts';
import { routes } from '@/lib';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order', width: 240 },
  { field: 'fullName', headerName: 'Deliver To', width: 288 },
  {
    field: 'paid',
    headerName: 'Payment',
    description: 'Shows wether the order was fulfilled or not',
    width: 200,
    renderCell: (params) =>
      params.row.paid ? (
        <Chip color="success" label="Fullfilled" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending" variant="outlined" />
      ),
  },
  {
    field: 'order',
    headerName: '',
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <NextLink href={`${routes.PAGE_ORDERS}/${params.row.id}`} passHref legacyBehavior>
        <Link underline="always">Order details</Link>
      </NextLink>
    ),
  },
];

interface HistoryPageProps {
  orders: Order[];
}

const HistoryPage = ({ orders }: HistoryPageProps) => {
  const rows = orders.length ? orders.map((order) => ({
    id: order.id,
    paid: order.isPaid,
    fullName: `${order.deliveryAddress?.firstName} ${order.deliveryAddress?.lastName}`,
  })) : [];

  return (
    <ShopLayout title={"Order's history"} pageDescription={"User order's history"}>
      <Typography variant="h1" component="h1" mb={2}>
        Orders{"'"} history
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} height={650} width="100%">
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `${routes.PAGE_LOGIN}?page=${routes.PAGE_ORDERS_HISTORY}`,
        permanent: false,
      },
    };
  }

  const orders = await findOrdersByUserId(session.user.id);

  return {
    props: { orders },
  };
};
