import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { UIContext } from '@/context';

export const SideMenu = () => {
  const { isMenuOpen, isOpenFromNavbar, closeMenu, isOpenFromNavbarToFalse } =
    useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState('');

  const searchInput = useRef<HTMLInputElement>();

  const router = useRouter();

  useEffect(() => {
    if (isOpenFromNavbar) {
      isOpenFromNavbarToFalse();
      setTimeout(() => searchInput.current?.focus(), 0);
    }
  }, [isOpenFromNavbar, isOpenFromNavbarToFalse]);

  const onClickNavigateTo = (path: string) => {
    return () => {
      closeMenu();
      router.push(path);
    };
  };

  const onChangeSearch = (evt: ChangeEvent<HTMLInputElement>) => setSearchTerm(evt.target.value);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    closeMenu();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={closeMenu}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              inputRef={searchInput}
              value={searchTerm}
              onChange={onChangeSearch}
              onKeyUp={(evt) => evt.key === 'Enter' && onSearchTerm()}
              placeholder="Search…"
              type="search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm} aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Order history'} />
          </ListItemButton>

          <Divider sx={{ display: { xs: '', sm: 'none' } }} />

          <ListItemButton
            onClick={onClickNavigateTo('/category/men')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItemButton>

          <ListItemButton
            onClick={onClickNavigateTo('/category/women')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItemButton>

          <ListItemButton
            onClick={onClickNavigateTo('/category/kids')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Kids'} />
          </ListItemButton>

          <Divider sx={{ display: { xs: '', sm: 'none' } }} />

          <ListItemButton>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Log in'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Log out'} />
          </ListItemButton>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItemButton>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Products'} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Orders'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
