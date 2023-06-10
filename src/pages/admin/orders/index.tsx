import { ConfirmationNumberOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { Box, Chip, CircularProgress, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Order } from '@prisma/client';
import Link from 'next/link';

import { AdminLayout } from '@/components/layouts';
import { useFetchApi } from '@/hooks';
import { routes } from '@/lib';
import { money } from '@/utils';

const datestamp = new Intl.DateTimeFormat('en-CA');

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 240 },
  {
    field: 'User.email',
    headerName: 'Email',
    width: 240,
    renderCell: ({ row }: GridRenderCellParams) => row.User.email,
  },
  {
    field: 'User.name',
    headerName: 'Name',
    width: 256,
    renderCell: ({ row }: GridRenderCellParams) => row.User.name,
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 112,
    renderCell: ({ value }: GridRenderCellParams) => money(value),
  },
  { field: 'itemCount', headerName: 'Items', width: 80 },
  {
    field: 'isPaid',
    headerName: 'Payment Status',
    width: 192,
    renderCell: ({ row }: GridRenderCellParams) =>
      row.isPaid ? (
        <Chip variant="outlined" label="Payment completed" color="success" />
      ) : (
        <Chip variant="outlined" label="Payment pending" color="error" />
      ),
  },
  {
    field: 'check',
    headerName: 'Link',
    renderCell: ({ row }: GridRenderCellParams) => (
      <Link href={`${routes.PAGE_ADMIN_ORDERS}/${row.id}`} target="_blank" rel="noreferrer">
        <OpenInNewOutlined color="primary" />
      </Link>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    width: 240,
    renderCell: ({ value }: GridRenderCellParams) => datestamp.format(new Date(value)),
  },
];

const AdminOrdersPage = () => {
  const { data: rows, isLoading } = useFetchApi<Order[]>({
    url: routes.API_ADMIN_ORDERS,
    emptyDataType: [],
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        maxWidth={1440}
      >
        <CircularProgress size={16 * 3} thickness={4} color="secondary" />
      </Box>
    );
  }

  return (
    <AdminLayout title="Orders" subtitle="Orders' managment" icon={<ConfirmationNumberOutlined />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} height={650} width="100%">
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
