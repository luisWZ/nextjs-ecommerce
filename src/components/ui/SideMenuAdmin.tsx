import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

export const SideMenuAdmin = () => {
  return (
    <>
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
    </>
  );
};
