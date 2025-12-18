import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Dashboard from "./pages/Dashboard";
//import ProtectedRoute from "./components/ProtectedRoute";

//import admin
import NhanKhau from './pages/NhanKhau'
import Quanlydancu from "./pages/Admin/QuanLyDanCu/Quanlydancu";
import Trangchinh from "./pages/Admin/trangchinh";
import Profile from './pages/Profile';
import DanhSachDangKyTaiKhoan from "./pages/Admin/PheDuyet/DanhSachDangKyTaiKhoan";
import DanhSachKhaiBaoSinhTu from "./pages/Admin/PheDuyet/DanhSachKhaiBaoSinhTu";
import DanhSachThuTien from "./pages/Admin/PheDuyet/DanhSachThuTien";
import DanhSachTamTruVang from "./pages/Admin/PheDuyet/DanhSachTamTruVang";
import FeeManagement from "./pages/Admin/fee";
import FeeHouseholdPage from "./pages/FeeHouseholdPage";
import ThongTinChiTietAdmin from "./pages/Admin/QuanLyDanCu/ThongTinChiTietAdmin";
import ThongTinHoDanAdmin from "./pages/Admin/QuanLyDanCu/ThongTinHoDanAdmin";

// import user
import ThongTinHoDan from "./pages/User/thongtinhodan";
import ThongTinChiTiet from "./pages/User/thongtinchitiet";
import MainUser from "./pages/User/trangchinhuser";
import KhoanNop from "./pages/User/khoannop";
import LichSuPheDuyet from "./pages/User/lichsupheduyet";

import LandingPage from "./pages/public/LandingPage";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/qldc" element={<Quanlydancu />} />
          <Route path="/tc" element={<Trangchinh />} />
          <Route path="/dktk" element={<DanhSachDangKyTaiKhoan />} />
          <Route path="/kbst" element={<DanhSachKhaiBaoSinhTu />} />
          <Route path="/thutien" element={<DanhSachThuTien />} />
          <Route path="/tamtruvang" element={<DanhSachTamTruVang />} />
          <Route path="/nhankhau" element={<NhanKhau />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fee" element={<FeeManagement /> }/>
          <Route path="/housefee" element={<FeeHouseholdPage /> }/>
          <Route path="/ThongTinChiTietadmin" element={<ThongTinChiTietAdmin />} />
          <Route path="/ThongTinHoDanadmin" element={<ThongTinHoDanAdmin />} />

          
          <Route path="/ThongTinHoDan" element={<ThongTinHoDan />} />
          <Route path="/ThongTinChiTiet" element={<ThongTinChiTiet />} />
          <Route path="/MainUser" element={<MainUser />} />
          <Route path="/feeuser" element={<KhoanNop />} />
          <Route path="/lichsu/thaydoi" element={<LichSuPheDuyet />} />


        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
