import '@/styles/globals.css';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { AuthProvider, UIProvider } from '@/context';
import { fetcher } from '@/hooks';
import { lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
