import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { ShopLayout } from '@/layouts';

const AddressPage = () => {
  return (
    <ShopLayout title="My address" pageDescription="User address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address 2 (optional)" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Zip Code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>Mexico</MenuItem>
              <MenuItem value={2}>Canada</MenuItem>
              <MenuItem value={3}>Colombia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box mt={5} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Review order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
