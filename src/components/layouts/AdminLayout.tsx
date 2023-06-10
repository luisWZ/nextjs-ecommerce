import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

import { SideMenu } from '@/ui';

import { AdminNavbar } from '../admin';

interface AdminLayoutProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
}

export const AdminLayout = ({ children, title, subtitle, icon }: AdminLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <Box
        sx={{ maxWidth: '1440px', px: { xs: 2, sm: 1, md: 4 }, my: { xs: 8, md: 10 }, mx: 'auto' }}
        component="main"
      >
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography variant="h1" component="h1">
            {icon}{!!icon && "\u2002"}{title}
          </Typography>
          <Typography variant="h2">{subtitle}</Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </Box>
    </>
  );
};
