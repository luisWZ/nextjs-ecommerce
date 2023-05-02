import '@/styles/globals.css';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { fetcher } from '@/hooks';
import { lightTheme } from '@/themes';

import { UIProvider } from '../context/UIContextProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
