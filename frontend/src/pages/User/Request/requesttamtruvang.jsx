// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
// } from "@mui/material";
// // Giả sử bạn muốn dùng form này làm mặc định
// import FormKhaiBaoTamTruVang from "./form_in4/FormKhaiBaoTamTruVang";

// export default function RequestTamTruVang() {
//   // 1. Chỉ cần 1 state để quản lý việc đóng/mở form khai báo
//   const [openForm, setOpenForm] = useState(false);
//   const [pendingList, setPendingList] = useState([]);
//   const [data, setData] = useState([]);

//   /* nhận dữ liệu từ form */
//   const handleAddRequest = (item) => {
//     setPendingList((prev) => [
//       ...prev,
//       {
//         ...item,
//         id: Date.now(),
//         status: "Chưa duyệt",
//       },
//     ]);
//     setOpenForm(false); // Đóng form sau khi submit thành công
//   };

//   /* cập nhật bảng */
//   const handleUpdate = () => {
//     setData((prev) => [...prev, ...pendingList]);
//     setPendingList([]);
//   };

//   const renderStatus = (status) => {
//     if (status === "Đã duyệt") return <Chip label="Đã duyệt" color="success" />;
//     if (status === "Từ chối") return <Chip label="Từ chối" color="error" />;
//     return <Chip label="Chưa duyệt" color="warning" />;
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       {/* HEADER */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
//           Khai báo tạm trú tạm vắng
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           {/* 2. Thay đổi: Khi click sẽ setOpenForm(true) luôn */}
//           <Button variant="outlined" onClick={() => setOpenForm(true)}>
//             Khai báo
//           </Button>
//           <Button variant="contained" onClick={handleUpdate}>
//             Cập nhật
//           </Button>
//         </Box>
//       </Box>

//       {/* TABLE */}
//       <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Vai trò</TableCell>
//               <TableCell>Họ tên</TableCell>
//               <TableCell>Mã hộ</TableCell>
//               <TableCell>Chủ hộ</TableCell>
//               <TableCell>Phân loại</TableCell>
//               <TableCell>Trạng thái</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {data.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   Chưa có khai báo nào
//                 </TableCell>
//               </TableRow>
//             )}

//             {data.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.role}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.houseHoldID}</TableCell>
//                 <TableCell>{item.chuHo}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={item.type}
//                     color={item.type === "Sinh" ? "success" : "error"}
//                   />
//                 </TableCell>
//                 <TableCell>{renderStatus(item.status)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* 3. Chỉ giữ lại Form bạn muốn hiển thị trực tiếp */}
//       <FormKhaiBaoTamTruVang
//         open={openForm}
//         onClose={() => setOpenForm(false)}
//         onSubmit={handleAddRequest}
//       />
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import FormKhaiBaoTamTruVang from "./form_in4/FormKhaiBaoTamTruVang";

export default function RequestTamTruVang() {
  const [openForm, setOpenForm] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [data, setData] = useState([]);

  /* nhận dữ liệu từ form */
  const handleAddRequest = (item) => {
    setPendingList((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        status: "Chưa duyệt",
      },
    ]);
    setOpenForm(false);
  };

  /* cập nhật bảng */
  const handleUpdate = () => {
    setData((prev) => [...prev, ...pendingList]);
    setPendingList([]);
  };

  const renderStatus = (status) => {
    if (status === "Đã duyệt")
      return <Chip label="Đã duyệt" color="success" size="small" />;
    if (status === "Từ chối")
      return <Chip label="Từ chối" color="error" size="small" />;
    return <Chip label="Chưa duyệt" color="warning" size="small" />;
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
          Khai báo tạm trú tạm vắng
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenForm(true)}>
            Khai báo
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Box>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Vai trò</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mã hộ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Chủ hộ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phân loại</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Chưa có khai báo nào
                </TableCell>
              </TableRow>
            )}

            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.houseHoldID}</TableCell>
                <TableCell>{item.chuHo}</TableCell>

                {/* CHỖ CẦN SỬA: Hiển thị phân loại Tạm trú/Tạm vắng */}
                <TableCell>
                  <Chip
                    label={item.type}
                    // Tạm trú dùng màu xanh (primary), Tạm vắng dùng màu cam (warning)
                    color={item.type === "Tạm trú" ? "primary" : "warning"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>

                <TableCell>{renderStatus(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormKhaiBaoTamTruVang
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleAddRequest}
      />
    </Box>
  );
}
