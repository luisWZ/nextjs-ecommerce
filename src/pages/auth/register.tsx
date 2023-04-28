import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';

import { AuthLayout } from '@/layouts';

const RegisterPage = () => {
  return (
    <AuthLayout title="Create an account">
      <Box sx={{ width: 352, px: 1, py: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Register
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" type="email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Confirm password" type="password" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" className="circular-btn" size="large" fullWidth>
              Create account
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">Do you have an account?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
