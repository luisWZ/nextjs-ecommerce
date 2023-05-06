import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

import { ShopLayout } from '@/layouts';
import { routes } from '@/lib';

const EmptyPage = () => {
  return (
    <ShopLayout title="Your cart is empty" pageDescription="There are no items in the cart yet">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Typography variant="h1" component="h1" fontSize={16 * 6} fontWeight={200}>
          <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🛒</span>
        </Typography>
        &emsp;
        <Typography
          fontSize={16 * 2}
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          There are no items in your cart yet
          <NextLink
            href={routes.PAGE_HOME}
            legacyBehavior
            passHref
            style={{
              textTransform: 'uppercase',
              fontSize: 16,
              fontWeight: 500 /* , fontStyle: 'italic' */,
            }}
          >
            <Link sx={{ textDecoration: 'underline' }}>
              Go get some
              <span style={{ textDecoration: 'none', display: 'inline-block' }}>&ensp;💪</span>
            </Link>
          </NextLink>
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
