import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

/* ===== FORM KHAI BÁO TỬ ===== */
export default function FormKhaiBaoTu({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    dateOfDeath: "",
    placeOfDeath: "",
    causeOfDeath: "",
    houseHoldID: "",
    chuHo: "",
    personalId: "",
    address: "",
    type: "Tử",
    role: "Dân cư",
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        dateOfBirth: "",
        dateOfDeath: "",
        placeOfDeath: "",
        causeOfDeath: "",
        houseHoldID: "",
        chuHo: "",
        personalId: "",
        address: "",
        type: "Tử",
        role: "Dân cư",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation: Kiểm tra các trường bắt buộc
  const isFormValid = () => {
    return (
      formData.role !== "" &&
      formData.name.trim() !== "" &&
      formData.dateOfDeath !== "" &&
      formData.houseHoldID.trim() !== "" &&
      formData.chuHo.trim() !== ""
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return; // Không submit nếu form chưa hợp lệ
    }
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setFormData({
      name: "",
      dateOfBirth: "",
      dateOfDeath: "",
      placeOfDeath: "",
      causeOfDeath: "",
      houseHoldID: "",
      chuHo: "",
      personalId: "",
      address: "",
      type: "Tử",
      role: "Dân cư",
    });
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: "",
      dateOfBirth: "",
      dateOfDeath: "",
      placeOfDeath: "",
      causeOfDeath: "",
      houseHoldID: "",
      chuHo: "",
      personalId: "",
      address: "",
      type: "Tử",
      role: "Dân cư",
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#333",
        }}
      >
        Khai báo tử
      </DialogTitle>

      <DialogContent sx={{ padding: "24px 32px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Vai trò <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
              }}
            >
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "12px 14px",
                    fontSize: "14px",
                  },
                }}
              >
                <MenuItem value="Dân cư">Dân cư</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Họ và tên người mất <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Ngày sinh
            </Typography>
            <TextField
              fullWidth
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Ngày mất <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="date"
              name="dateOfDeath"
              value={formData.dateOfDeath}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Nơi mất
            </Typography>
            <TextField
              fullWidth
              name="placeOfDeath"
              value={formData.placeOfDeath}
              onChange={handleChange}
              placeholder="Nhập nơi mất"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Nguyên nhân mất
            </Typography>
            <TextField
              fullWidth
              name="causeOfDeath"
              value={formData.causeOfDeath}
              onChange={handleChange}
              placeholder="Nhập nguyên nhân mất"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Mã hộ gia đình <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="houseHoldID"
              value={formData.houseHoldID}
              onChange={handleChange}
              placeholder="Nhập mã hộ gia đình"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Tên chủ hộ <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              name="chuHo"
              value={formData.chuHo}
              onChange={handleChange}
              placeholder="Nhập tên chủ hộ"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Số định danh cá nhân
            </Typography>
            <TextField
              fullWidth
              name="personalId"
              value={formData.personalId}
              onChange={handleChange}
              placeholder="Nhập số định danh cá nhân"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                mb: 1,
                color: "#666",
              }}
            >
              Địa chỉ thường trú
            </Typography>
            <TextField
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ thường trú"
              multiline
              rows={2}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F7FA",
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#E0E0E0" },
                  "&.Mui-focused fieldset": { borderColor: "#2D66F5" },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          padding: "16px 32px 24px",
        }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Khai báo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
