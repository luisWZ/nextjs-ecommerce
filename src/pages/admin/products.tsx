import { CategoryOutlined } from '@mui/icons-material';

import { AdminLayout } from '@/components/layouts';

const AdminProductsPage = () => {
  return (
    <AdminLayout
      title="Products"
      subtitle="Products' managment"
      icon={<CategoryOutlined />}
    ></AdminLayout>
  );
};

export default AdminProductsPage;
