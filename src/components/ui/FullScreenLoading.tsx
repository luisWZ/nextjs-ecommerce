import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Typography variant="h1" fontSize={16 * 4} fontWeight={200} color="secondary.main">
        loading
      </Typography>
      &emsp;
      <CircularProgress size={16 * 3} sx={{ mb: -1 }} thickness={4} color="secondary" />
    </Box>
  );
};
