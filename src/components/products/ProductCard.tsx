// import { Product } from '@prisma/client';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';

import { IProduct } from '@/interfaces';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { slug, images, title, price } = product;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      className="fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          <NextLink href={`/product/slug`} legacyBehavior passHref prefetch={false}>
            {/* <NextLink href={`/products/${slug}`} legacyBehavior passHref prefetch={false}> */}
            <Link>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ position: 'relative' }}
              >
                <CardMedia
                  component="img"
                  image={`products/${images[1]}`}
                  alt={title}
                  sx={{
                    position: 'absolute',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                  }}
                />
                <CardMedia component="img" image={`products/${images[0]}`} alt={title} />
              </Box>
            </Link>
          </NextLink>
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{title}</Typography>
        <Typography fontWeight={500}>
          {'$'}
          {price}
        </Typography>
      </Box>
    </Grid>
  );
};
