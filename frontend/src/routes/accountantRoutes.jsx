// import { Route, Navigate } from "react-router-dom";
// import MainLayoutForAccountant from "../layout/MainLayoutForAccountant";

// // CHÚ Ý: Import đúng file Dashboard bạn vừa tạo cho Accountant
// import AccountantDashboard from "../pages/Accountant/AccountantDashboard";
// import Profile from "../pages/Profile";

// export const accountantRoutes = (
//   <Route path="accountant" element={<MainLayoutForAccountant />}>
//     <Route index element={<Navigate to="dashboard" replace />} />

//     {/* Trang chủ */}
//     <Route path="dashboard" element={<AccountantDashboard />} />
//     {/* <Route path="/accountant/ThongTinHoDan" element={<ThongTinHoDanPage />} /> */}
//     {/* Chỉ để lại Navigate cho những link thực sự sai hoàn toàn */}
//     <Route path="*" element={<Navigate to="dashboard" replace />} />
//   </Route>
// );
// export default accountantRoutes;

import { Route, Navigate } from "react-router-dom";
import MainLayoutForAccountant from "../layout/MainLayoutForAccountant";

// Import các trang của bạn
import AccountantDashboard from "../pages/Accountant/AccountantDashboard";
import ThongTinHoDanPage from "../pages/Accountant/ThongTinHoDanPage"; // Giả sử đây là nơi bạn để file mới
import FeeHouseHoldPage from "../pages/Accountant/FeeHouseHoldPage";

export const accountantRoutes = (
  <Route path="accountant" element={<MainLayoutForAccountant />}>
    {/* Khi vào /accountant sẽ tự động nhảy sang /accountant/dashboard */}
    <Route index element={<Navigate to="dashboard" replace />} />

    {/* Trang chủ Dashboard */}
    <Route path="dashboard" element={<AccountantDashboard />} />
    <Route path="ThongTinHoDan" element={<ThongTinHoDanPage />} />

    {/* Các trang khác sau này bạn thêm ở đây */}
    <Route path="fee" element={<FeeHouseHoldPage />} />

    {/* Trang 404 cho riêng phân hệ accountant */}
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Route>
);

export default accountantRoutes;
