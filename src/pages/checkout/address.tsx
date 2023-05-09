import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CartContext } from '@/context';
import { Address } from '@/interface';
import { ShopLayout } from '@/layouts';
import { messages, routes } from '@/lib';

interface AddressPageProps {
  address: Address;
}

const AddressPage = ({ address }: AddressPageProps) => {
  const router = useRouter();
  const { cartUpdateDeliveryAddress } = useContext(CartContext);
  // const [defaultValues] = useState<Address>(() => {
  //   try {
  //     return Cookies.get(cookie.ADDRESS) ? JSON.parse(Cookies.get(cookie.ADDRESS)!) : {};
  //   } catch (error) {
  //     return {} as Address;
  //   }
  // });

  const { register, handleSubmit, formState } = useForm<Address>({ defaultValues: address });
  const { errors } = formState;

  const onSubmit: SubmitHandler<Address> = async (data) => {
    // const { firstName, lastName, address, address_2, city, zipCode, country, phone } = data;
    // console.log({ firstName, lastName, address, address_2, city, zipCode, country, phone });
    cartUpdateDeliveryAddress(data);

    router.push(routes.PAGE_CHECKOUT_SUMMARY);
  };

  return (
    <ShopLayout title="My address" pageDescription="User address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="fadeIn">
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName', { required: messages.FORM_REQUIRED })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              {...register('lastName', { required: messages.FORM_REQUIRED })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address', { required: messages.FORM_REQUIRED })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2 (optional)"
              variant="filled"
              fullWidth
              {...register('address_2', { required: false })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', { required: messages.FORM_REQUIRED })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              variant="filled"
              fullWidth
              {...register('zipCode', { required: messages.FORM_REQUIRED })}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Country"
                {...register('country', { required: messages.FORM_REQUIRED })}
                defaultValue={formState.defaultValues?.country ?? 'MX'}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                <MenuItem value="MX">Mexico</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="COL">Colombia</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', { required: messages.FORM_REQUIRED })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box mt={5} display="flex" justifyContent="center">
          <Button type="submit" color="secondary" className="circular-btn" size="large">
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { address = null } = req.cookies;

  return {
    props: { address: address ? JSON.parse(address) : {} },
  };
};
