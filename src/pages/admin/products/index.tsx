import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Button, capitalize, CardMedia, CircularProgress, Grid, Link } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Product } from '@prisma/client';
import NextLink from 'next/link';

import { AdminLayout } from '@/components/layouts';
import { useFetchApi } from '@/hooks';
import { routes } from '@/lib';
import { money } from '@/utils';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Image',
    renderCell: ({ row }: GridRenderCellParams) => (
      <NextLink href={`${routes.PAGE_PRODUCT}/${row.slug}`} target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          alt={row.title}
          className="fadeIn"
          image={
            row.images[0].startsWith('https')
              ? row.images[0]
              : `${routes.PUBLIC_PRODUCTS}/${row.images[0]}`
          }
        />
      </NextLink>
    ),
  },
  {
    field: 'title',
    headerName: 'Product Name',
    width: 16 * 18,
    renderCell: ({ row }: GridRenderCellParams) => (
      <NextLink href={`${routes.PAGE_ADMIN_PRODUCTS}/${row.id}`} passHref legacyBehavior>
        <Link underline="none">{row.title}</Link>
      </NextLink>
    ),
  },
  {
    field: 'gender',
    headerName: 'Gender' /* width: 240 */,
    renderCell: ({ value }: GridRenderCellParams) => capitalize(value),
  },
  {
    field: 'type',
    headerName: 'Type' /* width: 240 */,
    renderCell: ({ value }: GridRenderCellParams) => capitalize(value),
  },
  { field: 'inStock', headerName: 'Stock' /* , width: 240 */ },
  {
    field: 'price',
    headerName: 'Price',
    width: 112,
    renderCell: ({ value }: GridRenderCellParams) => money(value),
  },
  {
    field: 'sizes',
    headerName: 'Sizes',
    width: 240,
    renderCell: ({ value }: GridRenderCellParams) => value.join(' ,'),
  },
];

const AdminProductsPage = () => {
  const { data: rows, isLoading } = useFetchApi<Product[]>({
    url: routes.API_ADMIN_PRODUCTS,
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
    <AdminLayout
      title={`Products: ${rows.length}`}
      subtitle="Products' managment"
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href={routes.PAGE_ADMIN_PRODUCTS_NEW_PRODUCT}
        >
          Create new product
        </Button>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} height={650} width="100%">
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminProductsPage;
