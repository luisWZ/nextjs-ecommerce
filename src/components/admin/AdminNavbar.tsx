import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';

import { UIContext } from '@/context';
import { routes } from '@/lib';

export const AdminNavbar = () => {
  const { openMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={routes.PAGE_HOME} legacyBehavior passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box display="flex" gap={1}>
          <Button onClick={openMenu}>Menu</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
