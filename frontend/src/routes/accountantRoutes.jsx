import { Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import DanhSachThuTien from '../pages/Admin/PheDuyet/DanhSachThuTien';
import FeeManagement from '../pages/Admin/ThuPhi/fee';
import FeeHouseholdPage from '../pages/Admin/ThuPhi/FeeHouseholdPage';

// Routes cho Kế toán (ACCOUNTANT)
export const accountantRoutes = (
  <Route path="accountant" element={<MainLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="thutien" element={<DanhSachThuTien />} />
    <Route path="fee" element={<FeeManagement />} />
    <Route path="housefee" element={<FeeHouseholdPage />} />
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Route>
);

export default accountantRoutes;