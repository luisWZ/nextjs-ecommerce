import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef /* , GridRowProps, GridValueGetterParams */ } from '@mui/x-data-grid';
import NextLink from 'next/link';

import { ShopLayout } from '@/layouts';
import { routes } from '@/utils';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Name', width: 300 },
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
    headerName: 'Order',
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <NextLink href={`${routes.PAGE_ORDERS}/${params.row.id}`} passHref legacyBehavior>
        <Link underline="always">details</Link>
      </NextLink>
    ),
  },
];

const rows = [
  { id: '1', paid: true, fullName: 'Luis Lasso' },
  { id: '2', paid: false, fullName: 'Hernando Vallejo' },
  { id: '3', paid: true, fullName: 'Gil Barceinas' },
  { id: '4', paid: false, fullName: 'Efrain Bonilla' },
  { id: '5', paid: true, fullName: 'Juan Nieves' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title={"Order's history"} pageDescription={"User order's history"}>
      <Typography variant="h1" component="h1">
        Order{"'"}s history
      </Typography>

      <Grid container>
        <Grid item xs={12} height={650} width="100%">
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
