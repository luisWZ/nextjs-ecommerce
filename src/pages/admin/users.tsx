import { PeopleOutline } from '@mui/icons-material';
import { Box, CircularProgress, Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Role } from '@prisma/client';
import { useEffect, useState } from 'react';

import { AdminLayout } from '@/components/layouts';
import { useFetchApi } from '@/hooks';
import { UserData } from '@/interface';
import { routes, tesloApi } from '@/lib';

const rolesArray = Object.values(Role);

const AdminUsersPage = () => {
  const { data, isLoading } = useFetchApi<UserData[]>({
    url: routes.API_ADMIN_USERS,
    emptyDataType: [],
  });
  const [rows, setRows] = useState<UserData[]>([]);

  useEffect(() => {
    if (data.length) {
      setRows(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        maxWidth={1440}
      >
        <CircularProgress size={16 * 3} thickness={4} color="secondary" />
      </Box>
    );
  }

  const onRoleUpdate = async (userId: string, newRole: Role) => {
    const previousRows = [...rows];
    const updatedRows = rows.map((user) => ({
      ...user,
      role: userId === user.id ? newRole : user.role,
    }));

    setRows(updatedRows);

    try {
      await tesloApi.put(routes.API_ADMIN_USERS, { userId, role: newRole });
    } catch (error) {
      console.error(error);

      setRows(previousRows);
      alert('Unable to update user role. Please try again');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 256 },
    { field: 'name', headerName: 'Name', width: 288 },
    {
      field: 'role',
      headerName: 'Role',
      width: 208,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Select
          value={row.role}
          label="Role"
          sx={{ width: 208 }}
          onChange={({ target }) => onRoleUpdate(row.id, target.value)}
        >
          {rolesArray.map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <AdminLayout title="Users" subtitle="User's Administration" icon={<PeopleOutline />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} height={650} width="100%">
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminUsersPage;
