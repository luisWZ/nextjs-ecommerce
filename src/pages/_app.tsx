import '@/styles/globals.css';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import { AuthProvider, CartProvider, UIProvider } from '@/context';
import { fetcher } from '@/hooks';
import { lightTheme } from '@/themes';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '', currency: 'USD' }}
      >
        <SWRConfig value={{ fetcher }}>
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
