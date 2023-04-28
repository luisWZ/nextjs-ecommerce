import { Box, Button } from '@mui/material';
import { ValidSizes } from '@prisma/client';

interface SizeSelectorProps {
  selectedSize?: ValidSizes;
  sizes: ValidSizes[];
}

export const SizeSelector = ({ selectedSize, sizes }: SizeSelectorProps) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" color={selectedSize !== size ? 'primary' : 'inherit'}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
