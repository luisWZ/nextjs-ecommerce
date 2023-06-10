import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { CircularProgress, Grid, type SxProps, type Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

import { SummaryTile } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import { useFetchApi } from '@/hooks';
import { DashboardResponse } from '@/interface';
import { routes } from '@/lib';

const iconSize: SxProps<Theme> = { fontSize: 40 };

const AdminPage = () => {
  const { data, isError, isLoading } = useFetchApi<DashboardResponse>({
    url: routes.PAGE_ADMIN_DASHBOARD,
    config: {
      refreshInterval: 30 * 1000,
    },
    emptyDataType: null,
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(
      () => setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30)),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  if (isError) {
    console.error(isError);
    return <Typography>Error loading the data</Typography>;
  }

  const {
    ordersTotal,
    ordersPaid,
    ordersPending,
    clientsTotal,
    productsTotal,
    productsOutOfStock,
    productsLowStock,
  } = data;

  return (
    <AdminLayout title="Dashboard" subtitle="General Analytics" icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={ordersTotal}
          subtitle={'Total Orders'}
          icon={<CreditCardOutlined color="secondary" sx={iconSize} />}
        />
        <SummaryTile
          title={ordersPaid}
          subtitle={'Paid Orders'}
          icon={<AttachMoneyOutlined color="success" sx={iconSize} />}
        />
        <SummaryTile
          title={ordersPending}
          subtitle={'Pending Orders'}
          icon={<CreditCardOutlined color="error" sx={iconSize} />}
        />
        <SummaryTile
          title={clientsTotal}
          subtitle={'Clients'}
          icon={<GroupOutlined color="primary" sx={iconSize} />}
        />
        <SummaryTile
          title={productsTotal}
          subtitle={'Products'}
          icon={<CategoryOutlined color="info" sx={iconSize} />}
        />
        <SummaryTile
          title={productsOutOfStock}
          subtitle={'Out of Stock'}
          icon={<CancelPresentationOutlined color="error" sx={iconSize} />}
        />
        <SummaryTile
          title={productsLowStock}
          subtitle={'Low Stock'}
          icon={<ProductionQuantityLimitsOutlined color="warning" sx={iconSize} />}
        />
        <SummaryTile
          title={refreshIn}
          subtitle={'Last Refresh'}
          icon={<AccessTimeOutlined color="info" sx={iconSize} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default AdminPage;
