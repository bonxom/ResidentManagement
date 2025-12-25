// import React, { useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import AddProfileModal from "../../../feature/profile/AddProfile";
// import useAuthStore from "../../../store/authStore";

// /* ================== MOCK DATA ================== */

// const mockHouseholdTransactions = [
//   {
//     householdCode: "HD00123",
//     cccdChuHo: "012345678901",
//     chuHo: "Nguyễn Văn A",
//     paidCount: 3,
//     unpaidCount: 1,
//     totalPaid: 450000,
//     totalUnpaid: 150000,
//     lastPaidAt: "16/12/2025 10:20",
//   },
//   {
//     householdCode: "HD00124",
//     cccdChuHo: "012345678902",
//     chuHo: "Trần Thị B",
//     paidCount: 1,
//     unpaidCount: 2,
//     totalPaid: 150000,
//     totalUnpaid: 300000,
//     lastPaidAt: "15/12/2025 09:05",
//   },
//   {
//     householdCode: "HD00125",
//     cccdChuHo: "012345678903",
//     chuHo: "Lê Văn C",
//     paidCount: 0,
//     unpaidCount: 4,
//     totalPaid: 0,
//     totalUnpaid: 600000,
//     lastPaidAt: "-",
//   },
//   {
//     householdCode: "HD00126",
//     cccdChuHo: "012345678904",
//     chuHo: "Phạm Thị D",
//     paidCount: 2,
//     unpaidCount: 0,
//     totalPaid: 300000,
//     totalUnpaid: 0,
//     lastPaidAt: "16/12/2025 16:40",
//   },
// ];

// const formatMoney = (v) =>
//   typeof v === "number" ? v.toLocaleString("vi-VN") + " đ" : "-";

// /* ================== TABLE ================== */

// function HouseholdTransactionTable({ rows, rolePrefix }) {
//   const navigate = useNavigate();

//   const ROWS_PER_PAGE = 10;
//   const [page, setPage] = useState(1);

//   const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

//   const visibleRows = useMemo(
//     () => rows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),
//     [rows, page]
//   );

//   return (
//     <Box>
//       <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Mã hộ dân</TableCell>
//               <TableCell>CCCD chủ hộ</TableCell>
//               <TableCell>Chủ hộ</TableCell>
//               <TableCell align="right">Số khoản đã đóng</TableCell>
//               <TableCell align="right">Số khoản chưa đóng</TableCell>
//               <TableCell align="right">Tổng đã đóng</TableCell>
//               <TableCell align="right">Tổng chưa đóng</TableCell>
//               <TableCell>Lần đóng gần nhất</TableCell>
//               <TableCell align="center">Chi tiết</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {visibleRows.map((row) => (
//               <TableRow key={row.householdCode} hover>
//                 <TableCell>{row.householdCode}</TableCell>
//                 <TableCell>{row.cccdChuHo}</TableCell>
//                 <TableCell>{row.chuHo}</TableCell>

//                 <TableCell align="right" sx={{ fontWeight: 700, color: "#2e7d32" }}>
//                   {row.paidCount}
//                 </TableCell>

//                 <TableCell align="right" sx={{ fontWeight: 700, color: "#d32f2f" }}>
//                   {row.unpaidCount}
//                 </TableCell>

//                 <TableCell align="right">{formatMoney(row.totalPaid)}</TableCell>
//                 <TableCell align="right">{formatMoney(row.totalUnpaid)}</TableCell>

//                 <TableCell>{row.lastPaidAt}</TableCell>

//                 <TableCell align="center">
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     onClick={() =>
//                       navigate(
//                         `${rolePrefix}/lichsugiaodich/chi-tiet/${row.householdCode}`
//                       )
//                     }
//                   >
//                     Xem chi tiết
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//         <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} />
//       </Box>
//     </Box>
//   );
// }

// /* ================== PAGE ================== */

// export default function Lichsugiaodich() {
//   const [openAddProfileModal, setOpenAddProfileModal] = useState(false);
//   const [rows] = useState(mockHouseholdTransactions);

//   // ✅ lấy rolePrefix giống Sidebar
//   const { user: authUser } = useAuthStore();
//   const userRole = authUser?.role?.role_name;
//   const rolePrefix =
//     userRole === "HAMLET LEADER"
//       ? "/leader"
//       : userRole === "ACCOUNTANT"
//       ? "/accountant"
//       : "";

//   return (
//     <Box sx={{ padding: "24px 32px" }}>
//       <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
//         Lịch sử giao dịch 
//       </Typography>

//       <Box
//         sx={{
//           backgroundColor: "white",
//           borderRadius: "16px",
//           boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
//           p: 2,
//         }}
//       >
//         <HouseholdTransactionTable rows={rows} rolePrefix={rolePrefix} />
//       </Box>

//       <AddProfileModal
//         open={openAddProfileModal}
//         onClose={() => setOpenAddProfileModal(false)}
//         currentData={{}}
//         onSubmit={() => {}}
//       />
//     </Box>
//   );
// }

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Chip,
} from "@mui/material";

/* ================== MOCK DATA (Theo cấu trúc ảnh) ================== */
const mockTransactions = [
  {
    id: 1,
    createdAt: "10/12/2025 09:15",
    type: "Phí vệ sinh",
    period: "12/2025",
    amount: 150000,
    status: "Đã đóng",
    paidAt: "10/12/2025 09:15",
    method: "Tiền mặt",
  },
  {
    id: 2,
    createdAt: "15/12/2025 08:30",
    type: "Phí điện chiếu sáng",
    period: "12/2025",
    amount: 200000,
    status: "Chưa đóng",
    paidAt: "-",
    method: "-",
  },
  // Thêm data giả lập để test phân trang
  { id: 3, createdAt: "16/12/2025 10:00", type: "Phí an ninh", period: "12/2025", amount: 50000, status: "Đã đóng", paidAt: "16/12/2025 10:05", method: "Chuyển khoản" },
  { id: 4, createdAt: "17/12/2025 14:20", type: "Phí gửi xe", period: "12/2025", amount: 100000, status: "Chưa đóng", paidAt: "-", method: "-" },
  { id: 5, createdAt: "18/12/2025 09:00", type: "Phí rác thải", period: "12/2025", amount: 30000, status: "Đã đóng", paidAt: "18/12/2025 09:10", method: "Tiền mặt" },
  { id: 6, createdAt: "19/12/2025 11:30", type: "Phí bảo trì", period: "12/2025", amount: 500000, status: "Chưa đóng", paidAt: "-", method: "-" },
];

const formatMoney = (v) =>
  typeof v === "number" ? v.toLocaleString("vi-VN") + " đ" : "-";

/* ================== TABLE COMPONENT ================== */
function TransactionTable({ rows }) {
  // Thay đổi ở đây: tối đa thấy được 5 giao dịch
  const ROWS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

  const visibleRows = useMemo(
    () => rows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),
    [rows, page]
  );

  return (
    <Box>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #efefef", borderRadius: 3 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ backgroundColor: "#fafafa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Thời gian tạo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Khoản thu</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Kỳ</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Số tiền</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Thời gian đóng</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hình thức</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.period}</TableCell>
                <TableCell>{formatMoney(row.amount)}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      color: row.status === "Đã đóng" ? "#2e7d32" : "#d32f2f",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>{row.paidAt}</TableCell>
                <TableCell>{row.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang căn phải */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={(e, v) => setPage(v)} 
          shape="rounded"
          size="small"
        />
      </Box>
    </Box>
  );
}

/* ================== MAIN PAGE ================== */
export default function Lichsugiaodich() {
  const [rows] = useState(mockTransactions);

  return (
    <Box sx={{ padding: "24px 32px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 3, color: "#333" }}>
        Lịch sử giao dịch
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          p: 1, // Padding nhẹ bao quanh bảng
        }}
      >
        <TransactionTable rows={rows} />
      </Box>
    </Box>
  );
}