import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';

import { AuthLayout } from '@/layouts';

const LoginPage = () => {
  return (
    <AuthLayout title="Log In">
      <Box sx={{ width: 352, px: 1, py: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Start Session
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" type="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" className="circular-btn" size="large" fullWidth>
              Log In
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Link underline="always">Create an Account</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
