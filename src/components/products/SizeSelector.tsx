import { Box, Button } from '@mui/material';
import { ValidSizes } from '@prisma/client';

interface SizeSelectorProps {
  selectedSize?: ValidSizes;
  sizes: ValidSizes[];
  onSelectedSize: (size: ValidSizes) => () => void;
}

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: SizeSelectorProps) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={onSelectedSize(size)}
          key={size}
          size="small"
          color={selectedSize !== size ? 'primary' : 'secondary'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
