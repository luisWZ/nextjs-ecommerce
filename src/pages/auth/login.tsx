import { ErrorOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { BuiltInProviderType } from 'next-auth/providers';
import { /* getSession, */ ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { /* useContext,  */ useEffect, useState } from 'react';
import { LiteralUnion, SubmitHandler, useForm } from 'react-hook-form';

// import { AuthContext } from '@/context';
import { AuthLayout } from '@/layouts';
import { messages, routes } from '@/lib';
import { isValidEmail, retrieveSession } from '@/utils';

interface FormData {
  email: string;
  password: string;
}

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const LoginPage = () => {
  // const { authLogin } = useContext(AuthContext);
  const router = useRouter();

  const [providers, setProviders] = useState<Providers>(null);
  const [showError, setShowError] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  useEffect(() => {
    getProviders().then((providers) => {
      // console.log({ providers });
      setProviders(providers);
    });
  }, []);

  const onClickSignWithProvider = (providerId: string) => () => signIn(providerId);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setShowError(false);
    const { email, password } = data;

    // const isValidLogin = await authLogin({ email, password });

    // if (typeof isValidLogin === 'string') {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }

    // const path = router.query.page?.toString() ?? routes.PAGE_HOME;
    // router.replace(path);

    await signIn('credentials', { email, password });
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
                  router.query.page
                    ? `${routes.PAGE_REGISTER}?page=${router.query.page}`
                    : routes.PAGE_REGISTER
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Create an Account</Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="flex-end">
              <Divider sx={{ width: '100%', mb: 3, display: 'block' }} />
              {providers &&
                Object.values(providers)
                  .filter((provider: ClientSafeProvider) => provider.type === 'oauth')
                  .map(({ id, name }: ClientSafeProvider) => (
                    <Button
                      key={id}
                      variant="outlined"
                      sx={{ mb: 1 }}
                      className="circular-btn"
                      size="large"
                      fullWidth
                      onClick={onClickSignWithProvider(id)}
                    >
                      {name}
                    </Button>
                  ))}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

export const getServerSideProps = retrieveSession();

// {
//   callbackUrl: 'http://localhost:3000/api/auth/callback/google';
//   id: 'google';
//   name: 'Google';
//   signinUrl: 'http://localhost:3000/api/auth/signin/google';
//   type: 'oauth';
// }
