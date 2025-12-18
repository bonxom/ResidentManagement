// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   DialogTitle,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
// } from "@mui/material";

// export default function FormKhaiBaoTamTruVang({ open, onClose, onSubmit }) {
//   // Định nghĩa trạng thái trống chuẩn của form
//   const initialFormState = {
//     name: "",
//     gender: "",
//     dateOfBirth: "",
//     placeOfBirth: "",
//     houseHoldID: "",
//     chuHo: "",
//     personalId: "",
//     address: "",
//     type: "Tạm trú", // Mặc định luôn là Tạm trú
//     role: "Dân cư",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   // Reset form về trạng thái "Tạm trú" mỗi khi Dialog được mở
//   useEffect(() => {
//     if (open) {
//       setFormData(initialFormState);
//     }
//   }, [open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const isFormValid = () => {
//     return (
//       formData.name.trim() !== "" &&
//       formData.gender !== "" &&
//       formData.dateOfBirth !== "" &&
//       formData.houseHoldID.trim() !== "" &&
//       formData.chuHo.trim() !== ""
//     );
//   };

//   const handleSubmit = () => {
//     if (!isFormValid()) return;
//     if (onSubmit) onSubmit(formData);

//     // Reset ngay sau khi submit để lần sau mở ra không bị dính dữ liệu cũ
//     setFormData(initialFormState);
//     onClose();
//   };

//   const handleClose = () => {
//     setFormData(initialFormState);
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)",
//         },
//       }}
//     >
//       <DialogTitle sx={{ fontSize: "20px", fontWeight: 600, color: "#333" }}>
//         Khai báo tạm trú tạm vắng
//       </DialogTitle>

//       <DialogContent sx={{ padding: "24px 32px" }}>
//         <Grid container spacing={3}>
//           {/* TRƯỜNG PHÂN LOẠI - CHỈ CÓ 2 LỰA CHỌN */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Phân loại <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl
//               fullWidth
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                   "& fieldset": { borderColor: "transparent" },
//                   "&:hover fieldset": { borderColor: "#E0E0E0" },
//                   "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
//                 },
//               }}
//             >
//               <Select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 sx={{
//                   "& .MuiSelect-select": {
//                     padding: "12px 14px",
//                     fontSize: "14px",
//                   },
//                 }}
//               >
//                 <MenuItem value="Tạm trú">Tạm trú</MenuItem>
//                 <MenuItem value="Tạm vắng">Tạm vắng</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* VAI TRÒ */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Vai trò <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl
//               fullWidth
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                   "& fieldset": { borderColor: "transparent" },
//                   "&:hover fieldset": { borderColor: "#E0E0E0" },
//                   "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
//                 },
//               }}
//             >
//               <Select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 sx={{
//                   "& .MuiSelect-select": {
//                     padding: "12px 14px",
//                     fontSize: "14px",
//                   },
//                 }}
//               >
//                 <MenuItem value="Dân cư">Dân cư</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* HỌ TÊN */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Họ và tên <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Nhập họ và tên"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                   "& fieldset": { borderColor: "transparent" },
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "12px 14px",
//                   fontSize: "14px",
//                 },
//               }}
//             />
//           </Grid>

//           {/* GIỚI TÍNH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Giới tính <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl
//               fullWidth
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                   "& fieldset": { borderColor: "transparent" },
//                 },
//               }}
//             >
//               <Select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 sx={{
//                   "& .MuiSelect-select": {
//                     padding: "12px 14px",
//                     fontSize: "14px",
//                   },
//                 }}
//               >
//                 <MenuItem value="Nam">Nam</MenuItem>
//                 <MenuItem value="Nữ">Nữ</MenuItem>
//                 <MenuItem value="Khác">Khác</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* NGÀY SINH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Ngày sinh <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "12px 14px",
//                   fontSize: "14px",
//                 },
//               }}
//             />
//           </Grid>

//           {/* MÃ HỘ GIA ĐÌNH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Mã hộ gia đình <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="houseHoldID"
//               value={formData.houseHoldID}
//               onChange={handleChange}
//               placeholder="Nhập mã hộ gia đình"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "12px 14px",
//                   fontSize: "14px",
//                 },
//               }}
//             />
//           </Grid>

//           {/* CHỦ HỘ */}
//           <Grid item xs={12}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Tên chủ hộ <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="chuHo"
//               value={formData.chuHo}
//               onChange={handleChange}
//               placeholder="Nhập tên chủ hộ"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "12px 14px",
//                   fontSize: "14px",
//                 },
//               }}
//             />
//           </Grid>

//           {/* ĐỊA CHỈ */}
//           <Grid item xs={12}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Địa chỉ thường trú
//             </Typography>
//             <TextField
//               fullWidth
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Nhập địa chỉ thường trú"
//               multiline
//               rows={2}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "#F5F7FA",
//                   borderRadius: "8px",
//                 },
//                 "& .MuiInputBase-input": {
//                   padding: "12px 14px",
//                   fontSize: "14px",
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions
//         sx={{ justifyContent: "space-between", padding: "16px 32px 24px" }}
//       >
//         <Button variant="outlined" onClick={handleClose}>
//           Hủy
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={handleSubmit}
//           disabled={!isFormValid()}
//         >
//           Khai báo
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   DialogTitle,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
// } from "@mui/material";

// export default function FormKhaiBaoTamTruVang({ open, onClose, onSubmit }) {
//   // 1. Cập nhật initialFormState thêm trường "reason"
//   const initialFormState = {
//     name: "",
//     gender: "",
//     dateOfBirth: "",
//     placeOfBirth: "",
//     houseHoldID: "",
//     chuHo: "",
//     personalId: "",
//     address: "",
//     type: "Tạm trú",
//     role: "Dân cư",
//     reason: "", // Trường mới thêm
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     if (open) {
//       setFormData(initialFormState);
//     }
//   }, [open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 2. Cập nhật isFormValid (có thể yêu cầu bắt buộc nhập lý do)
//   const isFormValid = () => {
//     return (
//       formData.name.trim() !== "" &&
//       formData.gender !== "" &&
//       formData.dateOfBirth !== "" &&
//       formData.houseHoldID.trim() !== "" &&
//       formData.chuHo.trim() !== "" &&
//       formData.reason.trim() !== "" // Bắt buộc nhập lý do
//     );
//   };

//   const handleSubmit = () => {
//     if (!isFormValid()) return;
//     if (onSubmit) onSubmit(formData);
//     setFormData(initialFormState);
//     onClose();
//   };

//   const handleClose = () => {
//     setFormData(initialFormState);
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)",
//         },
//       }}
//     >
//       <DialogTitle sx={{ fontSize: "20px", fontWeight: 600, color: "#333" }}>
//         Khai báo tạm trú tạm vắng
//       </DialogTitle>

//       <DialogContent sx={{ padding: "24px 32px" }}>
//         <Grid container spacing={3}>
//           {/* PHÂN LOẠI */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Phân loại <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl fullWidth sx={formControlStyles}>
//               <Select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 sx={selectStyles}
//               >
//                 <MenuItem value="Tạm trú">Tạm trú</MenuItem>
//                 <MenuItem value="Tạm vắng">Tạm vắng</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* VAI TRÒ */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Vai trò <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl fullWidth sx={formControlStyles}>
//               <Select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 sx={selectStyles}
//               >
//                 <MenuItem value="Dân cư">Dân cư</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* HỌ TÊN */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Họ và tên <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Nhập họ và tên"
//               sx={textFieldStyles}
//             />
//           </Grid>

//           {/* GIỚI TÍNH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Giới tính <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <FormControl fullWidth sx={formControlStyles}>
//               <Select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 sx={selectStyles}
//               >
//                 <MenuItem value="Nam">Nam</MenuItem>
//                 <MenuItem value="Nữ">Nữ</MenuItem>
//                 <MenuItem value="Khác">Khác</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* NGÀY SINH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Ngày sinh <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               sx={textFieldStyles}
//             />
//           </Grid>

//           {/* MÃ HỘ GIA ĐÌNH */}
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Mã hộ gia đình <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="houseHoldID"
//               value={formData.houseHoldID}
//               onChange={handleChange}
//               placeholder="Nhập mã hộ gia đình"
//               sx={textFieldStyles}
//             />
//           </Grid>

//           {/* CHỦ HỘ */}
//           <Grid item xs={12}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Tên chủ hộ <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="chuHo"
//               value={formData.chuHo}
//               onChange={handleChange}
//               placeholder="Nhập tên chủ hộ"
//               sx={textFieldStyles}
//             />
//           </Grid>

//           {/* ĐỊA CHỈ THƯỜNG TRÚ */}
//           <Grid item xs={12}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Địa chỉ thường trú
//             </Typography>
//             <TextField
//               fullWidth
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Nhập địa chỉ thường trú"
//               multiline
//               rows={2}
//               sx={textFieldStyles}
//             />
//           </Grid>

//           {/* 3. TRƯỜNG LÝ DO TẠM TRÚ/VẮNG (MỚI THÊM) */}
//           <Grid item xs={12}>
//             <Typography
//               sx={{ fontSize: "13px", fontWeight: 500, mb: 1, color: "#666" }}
//             >
//               Lý do {formData.type.toLowerCase()}{" "}
//               <span style={{ color: "red" }}>*</span>
//             </Typography>
//             <TextField
//               fullWidth
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               placeholder={`Nhập lý do ${formData.type.toLowerCase()} (ví dụ: Đi học, Đi làm, Về quê...)`}
//               multiline
//               rows={3}
//               sx={textFieldStyles}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions
//         sx={{ justifyContent: "space-between", padding: "16px 32px 24px" }}
//       >
//         <Button variant="outlined" onClick={handleClose}>
//           Hủy
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={handleSubmit}
//           disabled={!isFormValid()}
//         >
//           Khai báo
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// // Tách các styles ra để code gọn hơn
// const formControlStyles = {
//   "& .MuiOutlinedInput-root": {
//     backgroundColor: "#F5F7FA",
//     borderRadius: "8px",
//     "& fieldset": { borderColor: "transparent" },
//     "&:hover fieldset": { borderColor: "#E0E0E0" },
//     "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
//   },
// };

// const selectStyles = {
//   "& .MuiSelect-select": {
//     padding: "12px 14px",
//     fontSize: "14px",
//   },
// };

// const textFieldStyles = {
//   "& .MuiOutlinedInput-root": {
//     backgroundColor: "#F5F7FA",
//     borderRadius: "8px",
//     "& fieldset": { borderColor: "transparent" },
//   },
//   "& .MuiInputBase-input": {
//     padding: "12px 14px",
//     fontSize: "14px",
//   },
// };

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

// --- STYLES TÁI SỬ DỤNG ---
const labelStyles = {
  fontSize: "13px",
  fontWeight: 500,
  mb: 0.5,
  color: "#666",
};

const inputGroupStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F5F7FA",
    borderRadius: "8px",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "#E0E0E0" },
    "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    fontSize: "14px",
  },
};

export default function FormKhaiBaoTamTruVang({ open, onClose, onSubmit }) {
  const initialFormState = {
    name: "",
    gender: "",
    dateOfBirth: "",
    houseHoldID: "",
    chuHo: "",
    address: "",
    type: "Tạm trú",
    role: "Dân cư",
    reason: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (open) setFormData(initialFormState);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "gender",
      "dateOfBirth",
      "houseHoldID",
      "chuHo",
      "reason",
    ];
    return requiredFields.every((field) => formData[field]?.trim() !== "");
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    if (onSubmit) onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" },
      }}
    >
      <DialogTitle sx={{ fontSize: "20px", fontWeight: 600, pb: 1 }}>
        Khai báo tạm trú tạm vắng
      </DialogTitle>

      <DialogContent sx={{ padding: "16px 32px" }}>
        <Grid container spacing={2.5}>
          {/* HÀNG 1: LOẠI & VAI TRÒ */}
          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Phân loại <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth sx={inputGroupStyles}>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <MenuItem value="Tạm trú">Tạm trú</MenuItem>
                <MenuItem value="Tạm vắng">Tạm vắng</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Vai trò <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth sx={inputGroupStyles}>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <MenuItem value="Dân cư">Dân cư</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* HÀNG 2: HỌ TÊN & GIỚI TÍNH */}
          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Họ và tên <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              sx={inputGroupStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Giới tính <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth sx={inputGroupStyles}>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* HÀNG 3: NGÀY SINH & MÃ HỘ */}
          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Ngày sinh <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={inputGroupStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Mã hộ gia đình <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="houseHoldID"
              value={formData.houseHoldID}
              onChange={handleChange}
              placeholder="Nhập mã hộ"
              sx={inputGroupStyles}
            />
          </Grid>

          {/* HÀNG 4: CHỦ HỘ */}
          <Grid item xs={12}>
            <Typography sx={labelStyles}>
              Tên chủ hộ <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="chuHo"
              value={formData.chuHo}
              onChange={handleChange}
              placeholder="Nhập tên chủ hộ"
              sx={inputGroupStyles}
            />
          </Grid>

          {/* HÀNG 5: ĐỊA CHỈ & LÝ DO (ĐÃ THU NHỎ) */}
          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>Địa chỉ thường trú</Typography>
            <TextField
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Số nhà, tên đường..."
              multiline
              rows={1.5}
              sx={inputGroupStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={labelStyles}>
              Lý do {formData.type.toLowerCase()}{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Lý do cụ thể..."
              multiline
              rows={1.5}
              sx={inputGroupStyles}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "space-between", padding: "16px 32px 24px" }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            px: 4,
            boxShadow: "none",
          }}
        >
          Khai báo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
