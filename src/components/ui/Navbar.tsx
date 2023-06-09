import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Button,
  capitalize,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { Gender } from '@prisma/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useState } from 'react';

import { CartContext, UIContext } from '@/context';
import { routes } from '@/lib';

import { NavLinks } from './ActiveLink';

export const Navbar = () => {
  const { openMenu, openMenuForSearch } = useContext(UIContext);
  const { itemCount } = useContext(CartContext);

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onChangeSearch = (evt: ChangeEvent<HTMLInputElement>) => setSearchTerm(evt.target.value);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`${routes.PAGE_SEARCH}/${searchTerm}`);
  };

  const onClickShowSearch = () => setIsSearchVisible(true);

  const onClickHideSearch = () => {
    setIsSearchVisible(false);
    setSearchTerm('');
  };

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

        <Box
          gap={1}
          className="fadeIn"
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}
        >
          <NavLinks href={routes.PAGE_CATEGORY_MEN} text={capitalize(Gender.men)} />
          <NavLinks href={routes.PAGE_CATEGORY_WOMEN} text={capitalize(Gender.women)} />
          <NavLinks href={routes.PAGE_CATEGORY_KIDS} text={capitalize(Gender.kids)} />
        </Box>

        <Box flex={1} />

        <Box display="flex" gap={1}>
          <Box sx={{ display: { xs: 'none', sm: 'initial' } }}>
            {isSearchVisible ? (
              <Input
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={onChangeSearch}
                onKeyUp={(evt) => evt.key === 'Enter' && onSearchTerm()}
                placeholder="Search…"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={onClickHideSearch} aria-label="toggle password visibility">
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <IconButton className="fadeIn" onClick={onClickShowSearch}>
                <SearchOutlined />
              </IconButton>
            )}
          </Box>

          <IconButton onClick={openMenuForSearch} sx={{ display: { xs: 'initial', sm: 'none' } }}>
            <SearchOutlined />
          </IconButton>

          <NextLink href={routes.PAGE_CART} legacyBehavior passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={itemCount} max={10} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <Button onClick={openMenu}>Menu</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
