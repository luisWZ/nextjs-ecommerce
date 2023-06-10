import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
} from '@mui/icons-material';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

import { routes } from '@/lib';

interface SideMenuAdminProps {
  onClickNavigateTo: (path: string) => () => void;
}

export const SideMenuAdmin = ({ onClickNavigateTo }: SideMenuAdminProps) => {
  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>

      <ListItemButton onClick={onClickNavigateTo(routes.PAGE_ADMIN)}>
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <ListItemText primary={'Dashboard'} />
      </ListItemButton>
      <ListItemButton onClick={onClickNavigateTo(routes.PAGE_ADMIN_PRODUCTS)}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={'Products'} />
      </ListItemButton>
      <ListItemButton onClick={onClickNavigateTo(routes.PAGE_ADMIN_ORDERS)}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={'Orders'} />
      </ListItemButton>

      <ListItemButton onClick={onClickNavigateTo(routes.PAGE_ADMIN_USERS)}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={'Users'} />
      </ListItemButton>
    </>
  );
};
