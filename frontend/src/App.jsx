import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

//import admin
import NhanKhau from './pages/NhanKhau'
import Quanlydancu from "./pages/Admin/Quanlydancu";
import Trangchinh from "./pages/Admin/trangchinh";
import Profile from './pages/Profile';
import DanhSachDangKyTaiKhoan from "./pages/Admin/DanhSachDangKyTaiKhoan";
import DanhSachKhaiBaoSinhTu from "./pages/Admin/DanhSachKhaiBaoSinhTu";
import DanhSachThuTien from "./pages/Admin/DanhSachThuTien";
import DanhSachTamTruVang from "./pages/Admin/DanhSachTamTruVang";

// import user
import UserInfo from "./pages/User/thongtinhodan";
import DetailProfile from "./pages/User/thongtinchitiet";
import MainUser from "./pages/User/trangchinhuser";
import Feeuser from "./pages/User/khoannop";

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
          <Route path="/" element={<Navigate to="/signin" replace />} />
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

          
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/detailuserinfo" element={<DetailProfile />} />
          <Route path="/MainUser" element={<MainUser />} />
          <Route path="/feeuser" element={<Feeuser />} />


        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
