import { Box, CircularProgress, Typography } from '@mui/material';

interface FullScreenLoadingProps {
  text?: string;
  size?: number;
}

export const FullScreenLoading = ({ text = 'loading', size = 4 }: FullScreenLoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Typography
        variant="h1"
        fontSize={16 * size}
        textAlign="center"
        fontWeight={200}
        color="secondary.main"
      >
        {text}
      </Typography>
      &emsp;
      <CircularProgress size={16 * 3} sx={{ mb: -1 }} thickness={4} color="secondary" />
    </Box>
  );
};
