import { Box } from '@mui/material';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title: string;
}

export const AuthLayout = ({ children, title }: PropsWithChildren & AuthLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 192px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};