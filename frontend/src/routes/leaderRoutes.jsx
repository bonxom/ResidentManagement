import { Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Quanlydancu from '../pages/Admin/QuanLyDanCu/Quanlydancu';
import Trangchinh from '../pages/Admin/trangchinh';
import Profile from '../pages/Profile';
import DanhSachDangKyTaiKhoan from '../pages/Admin/PheDuyet/DanhSachDangKyTaiKhoan';
import DanhSachKhaiBaoSinhTu from '../pages/Admin/PheDuyet/DanhSachKhaiBaoSinhTu';
import DanhSachThuTien from '../pages/Admin/PheDuyet/DanhSachThuTien';
import DanhSachTamTruVang from '../pages/Admin/PheDuyet/DanhSachTamTruVang';
import FeeManagement from '../pages/Admin/ThuPhi/fee';
import FeeHouseholdPage from '../pages/Admin/ThuPhi/FeeHouseholdPage';
import ThongTinChiTietAdmin from '../pages/Admin/QuanLyDanCu/ThongTinChiTietAdmin';
import ThongTinHoDanAdmin from '../pages/Admin/QuanLyDanCu/ThongTinHoDanAdmin';
import ThemThongTinCuDan from '../pages/Admin/QuanLyDanCu/ThemThongTinCuDan';
import NhanKhau from '../pages/NhanKhau';
import Setting from "../feature/Setting";

// Routes cho Tổ trưởng (HAMLET LEADER)
export const leaderRoutes = (
  <Route path="leader" element={<MainLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="qldc" element={<Quanlydancu />} />
    <Route path="tc" element={<Trangchinh />} />
    <Route path="profile" element={<Profile />} />
    <Route path="dktk" element={<DanhSachDangKyTaiKhoan />} />
    <Route path="kbst" element={<DanhSachKhaiBaoSinhTu />} />
    <Route path="thutien" element={<DanhSachThuTien />} />
    <Route path="tamtruvang" element={<DanhSachTamTruVang />} />
    <Route path="nhankhau" element={<NhanKhau />} />
    <Route path="themcudan" element={<ThemThongTinCuDan />} />
    <Route path="fee" element={<FeeManagement />} />
    <Route path="housefee" element={<FeeHouseholdPage />} />
    <Route path="ThongTinChiTietadmin" element={<ThongTinChiTietAdmin />} />
    <Route path="ThongTinHoDanadmin" element={<ThongTinHoDanAdmin />} />
    <Route path="*" element={<Navigate to="dashboard" replace />} />
    <Route path="setting" element={<Setting />} />
  </Route>
);

export default leaderRoutes;