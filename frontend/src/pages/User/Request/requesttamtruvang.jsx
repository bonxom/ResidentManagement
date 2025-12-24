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

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { requestAPI, householdAPI } from "../../../api/apiService";
import useAuthStore from "../../../store/authStore";

const residenceFields = [
  { name: "name", label: "Họ và tên", required: true },
  { name: "userCardID", label: "CCCD/ID", required: true },
  { name: "sex", label: "Giới tính", required: true, select: true, options: ["Nam", "Nữ", "Khác"] },
  { name: "dob", label: "Ngày sinh", required: true, type: "date" },
  { name: "birthLocation", label: "Nơi sinh", required: true },
  { name: "ethnic", label: "Dân tộc", required: true },
  { name: "phoneNumber", label: "Số điện thoại", required: true },
  { name: "job", label: "Nghề nghiệp", required: true },
  { name: "startDate", label: "Bắt đầu", required: true, type: "date" },
  { name: "endDate", label: "Kết thúc", required: true, type: "date" },
  { name: "reason", label: "Lý do", required: true, multiline: true },
];

const absenceFields = [
  { name: "memberId", label: "Thành viên", required: true, select: true, options: [] },
  { name: "fromDate", label: "Từ ngày", required: true, type: "date" },
  { name: "toDate", label: "Đến ngày", required: true, type: "date" },
  { name: "temporaryAddress", label: "Địa chỉ tạm trú", required: true },
  { name: "reason", label: "Lý do", required: true, multiline: true },
];

const initialResidence = residenceFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
const initialAbsence = absenceFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

export default function RequestTamTruVang() {
  const { user } = useAuthStore();
  const [mode, setMode] = useState("TEMPORARY_RESIDENCE");
  const [residenceData, setResidenceData] = useState(initialResidence);
  const [absenceData, setAbsenceData] = useState(initialAbsence);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!user?.household) return;
      try {
        const res = await householdAPI.getMembers(user.household);
        setMembers(res || []);
      } catch (err) {
        console.error("Fetch members failed", err);
      }
    };
    fetchMembers();
  }, [user?.household]);

  const absenceFieldsWithOptions = useMemo(() => {
    return absenceFields.map((f) =>
      f.name === "memberId"
        ? { ...f, options: members.map((m) => ({ value: m._id, label: `${m.name} (${m.userCardID || ""})` })) }
        : f
    );
  }, [members]);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateFields = (fields, data) => {
    return fields.every((f) => !f.required || (data[f.name] && data[f.name].toString().trim() !== ""));
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (!user?.household) {
        throw new Error("Bạn chưa thuộc hộ khẩu nào.");
      }
      if (mode === "TEMPORARY_RESIDENCE") {
        if (!validateFields(residenceFields, residenceData)) {
          throw new Error("Vui lòng nhập đầy đủ thông tin tạm trú.");
        }
        await requestAPI.createTemporaryResidence(residenceData);
        setResidenceData(initialResidence);
        setSuccess("Đã gửi yêu cầu tạm trú.");
      } else {
        if (!validateFields(absenceFields, absenceData)) {
          throw new Error("Vui lòng nhập đầy đủ thông tin tạm vắng.");
        }
        const payload = {
          userId: absenceData.memberId,
          fromDate: absenceData.fromDate,
          toDate: absenceData.toDate,
          temporaryAddress: absenceData.temporaryAddress,
          reason: absenceData.reason,
        };
        await requestAPI.createTemporaryAbsence(payload);
        setAbsenceData(initialAbsence);
        setSuccess("Đã gửi yêu cầu tạm vắng.");
      }
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Gửi yêu cầu thất bại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field, data, setter) => {
    if (field.select) {
      return (
        <FormControl fullWidth size="small">
          <InputLabel>{field.label}</InputLabel>
          <Select
            label={field.label}
            name={field.name}
            value={data[field.name]}
            onChange={handleChange(setter)}
          >
            {field.options.map((opt) =>
              typeof opt === "string" ? (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ) : (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      );
    }

    const dateProps =
      field.type === "date"
        ? {
            InputLabelProps: { shrink: true },
          }
        : {};

    return (
      <TextField
        fullWidth
        size="small"
        name={field.name}
        label={field.label}
        type={field.type || "text"}
        value={data[field.name]}
        onChange={handleChange(setter)}
        multiline={field.multiline}
        minRows={field.multiline ? 2 : undefined}
        {...dateProps}
      />
    );
  };

  const isResidence = mode === "TEMPORARY_RESIDENCE";
  const currentFields = isResidence ? residenceFields : absenceFieldsWithOptions;
  const currentData = isResidence ? residenceData : absenceData;
  const currentSetter = isResidence ? setResidenceData : setAbsenceData;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
          Khai báo tạm trú tạm vắng
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={isResidence ? "contained" : "outlined"}
            onClick={() => setMode("TEMPORARY_RESIDENCE")}
          >
            Tạm trú
          </Button>
          <Button
            variant={!isResidence ? "contained" : "outlined"}
            onClick={() => setMode("TEMPORARY_ABSENT")}
          >
            Tạm vắng
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={2}>
        {currentFields.map((field) => (
          <Grid item xs={12} sm={field.multiline ? 12 : 6} key={field.name}>
            {renderField(field, currentData, currentSetter)}
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button variant="outlined" onClick={() => {
          setResidenceData(initialResidence);
          setAbsenceData(initialAbsence);
          setError(null);
          setSuccess(null);
        }}>
          Xóa form
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Gửi yêu cầu"}
        </Button>
      </Box>
    </Box>
  );
}
