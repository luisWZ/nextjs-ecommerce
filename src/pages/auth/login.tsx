import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, capitalize, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthContext } from '@/context';
import { AuthLayout } from '@/layouts';
import { isValidEmail, messages } from '@/utils';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { authLogin } = useContext(AuthContext);
  const router = useRouter();

  const [showError, setShowError] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setShowError(false);
    const { email, password } = data;
    const isValidLogin = await authLogin({ email, password });

    if (typeof isValidLogin === 'string') {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);

      return;
    }

    const path = router.query.page?.toString() ?? '/';
    router.replace(path);
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: 352, px: 1, py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Start Session
                <br />
                <Chip
                  label={capitalize(messages.USER_INVALID_LOGIN)}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ mt: 1, display: showError ? 'inline-flex' : 'none' }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: messages.FORM_EMAIL_INVALID,
                  validate: isValidEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Password needs to be at least 6 characters long',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <NextLink
                href={
                  router.query.page ? `/auth/register?page=${router.query.page}` : '/auth/register'
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Create an Account</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
