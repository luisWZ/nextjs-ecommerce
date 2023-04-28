import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/layouts';

const NotFoundPage = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="404 page">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Typography variant="h1" component="h1" fontSize={16 * 6} fontWeight={200}>
          404 🚧
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
          Dead End Ahead
          <span style={{ fontSize: 16, fontWeight: 500 /* , fontStyle: 'italic' */ }}>
            PAGE NOT FOUND
          </span>
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFoundPage;
