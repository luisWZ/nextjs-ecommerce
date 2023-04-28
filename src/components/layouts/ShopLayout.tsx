import { Box } from '@mui/material';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

import { Navbar, SideMenu } from '../ui';

interface ShopLayoutProps extends PropsWithChildren {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: ShopLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <Box
        sx={{ maxWidth: '1440px', px: { xs: 2, sm: 1, md: 4 }, my: { xs: 8, md: 10 }, mx: 'auto' }}
        component="main"
      >
        {children}
      </Box>

      <footer>{/* TODO */}</footer>
    </>
  );
};
