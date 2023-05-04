import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface ItemCounterProps {
  quantity: number;
  modifyQuantity?: (operation: '-' | '+') => () => void;
}

export const ItemCounter = ({ quantity, modifyQuantity = () => () => {} }: ItemCounterProps) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={modifyQuantity('-')} disabled={!quantity}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{quantity}</Typography>
      <IconButton onClick={modifyQuantity('+')} disabled={!quantity}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
