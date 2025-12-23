import { Route, Navigate } from "react-router-dom";
import MainLayoutForUser from "../layout/MainLayoutForUser";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ThongTinHoDan from "../pages/User/Request/thongtinhodan";
import ThongTinChiTiet from "../pages/User/Request/thongtinchitiet";
import KhoanNop from "../pages/User/Request/khoannop";
import RequestSinhTu from "../pages/User/Request/requestsinhtu";
import RequestTamTruVang from "../pages/User/Request/requesttamtruvang";
import YeuCauTamTruVang from "../pages/UserTemp";
import LichSuPheDuyet from "../pages/User/LichSu/lichsuchinhsua";
// Routes cho Dân cư (MEMBER)
export const memberRoutes = (
  <Route path="member" element={<MainLayoutForUser />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="ThongTinHoDan" element={<ThongTinHoDan />} />
    <Route path="ThongTinChiTiet" element={<ThongTinChiTiet />} />
    <Route path="feeuser" element={<KhoanNop />} />
    <Route path="requestsinhtu" element={<RequestSinhTu />} />
    <Route path="requesttamtruvang" element={<RequestTamTruVang />} />
    <Route path="yeucau/tamtruvang" element={<YeuCauTamTruVang />} />
    <Route path="lichsu/thaydoi" element={<LichSuPheDuyet />} />
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Route>
);

export default memberRoutes;
