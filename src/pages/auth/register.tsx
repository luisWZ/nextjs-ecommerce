import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, capitalize, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthContext } from '@/context';
import { AuthLayout } from '@/layouts';
import { isValidEmail, isValidName, isValidPassword, messages } from '@/utils';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { authRegister } = useContext(AuthContext);
  const router = useRouter();

  const [showError, setShowError] = useState<string | false>(false);
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setShowError(false);
    const { name, email, password } = data;
    const isValidLogin = await authRegister({ name, email, password });

    if (typeof isValidLogin === 'string') {
      setShowError(isValidLogin);
      setTimeout(() => setShowError(false), 3000);

      return;
    }

    const path = router.query.page?.toString() ?? '/';
    router.replace(path);
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: 352, px: 1, py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
                <br />
                <Chip
                  label={showError ? capitalize(showError) : ''}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ mt: 1, display: showError ? 'inline-flex' : 'none' }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: messages.FORM_REQUIRED,
                  validate: isValidName,
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: messages.FORM_REQUIRED,
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
                  required: messages.FORM_REQUIRED,
                  validate: isValidPassword,
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Confirm password"
                type="password"
                variant="filled"
                fullWidth
                {...register('confirmPassword', {
                  required: true,
                  // validate: isPasswordMatch()
                })}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Create account
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <NextLink
                href={router.query.page ? `/auth/login?page=${router.query.page}` : '/auth/login'}
                passHref
                legacyBehavior
              >
                <Link underline="always">Do you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
