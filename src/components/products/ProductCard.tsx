import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { Product } from '@prisma/client';
import NextLink from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { slug, images, title, price } = product;

  const [isHovered, setIsHovered] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

  const onMediaLoad = () => setIsMediaLoaded(true);

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
          <NextLink href={`/product/${slug}`} legacyBehavior passHref prefetch={false}>
            <Link>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ position: 'relative' }}
              >
                <CardMedia
                  onLoad={onMediaLoad}
                  component="img"
                  image={`/products/${images[1]}`}
                  alt={title}
                  sx={{
                    position: 'absolute',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                  }}
                />
                <CardMedia component="img" image={`/products/${images[0]}`} alt={title} />
              </Box>
            </Link>
          </NextLink>
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1, display: isMediaLoaded ? 'block': 'none' }} className="fadeIn">
        <Typography fontWeight={700}>{title}</Typography>
        <Typography fontWeight={500}>
          {'$'}
          {price}
        </Typography>
      </Box>
    </Grid>
  );
};
