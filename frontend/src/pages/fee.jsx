import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { feeAPI } from "../services/apiService";
import { Sidebar, drawerWidth } from "../components/Sidebar";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert
} from "@mui/material";


function FeeManagement() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState("");

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    type: "",
    description: "",
    unitPrice: "",
    status: ""
  });

  const feeTypes = [
    { value: "MANDATORY", label: "Bắt buộc" },
    { value: "VOLUNTARY", label: "Tự nguyện" }
  ];

  const statusTypes = [
    { value: "ACTIVE", label: "Đang hiệu lực" },
    { value: "COMPLETED", label: "Đã hoàn thành" }
  ];

  if (!user) {
    navigate("/signin");
    return null;
  }

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  const fetchFees = async () => {
    try {
      const data = await feeAPI.getAllFees();
      setFees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // Dialog tạo khoản thu
  const handleOpenCreate = () => {
    setIsEdit(false);
    setFormData({
      _id: "",
      name: "",
      type: "",
      description: "",
      unitPrice: "",
      status: "ACTIVE"
    });
    setBackendError("");
    setOpen(true);
  };

  const handleOpenEdit = (fee) => {
    setIsEdit(true);
    setFormData({
      _id: fee._id,
      name: fee.name,
      type: fee.type,
      description: fee.description || "",
      unitPrice: fee.unitPrice?.toString() || "",
      status: fee.status || "ACTIVE"
    });
    setBackendError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBackendError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "unitPrice") {
      if (value && !/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (backendError) setBackendError("");
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setBackendError("");

      // Validate
      if (!formData.name.trim()) {
        setBackendError("Tên khoản thu không được để trống");
        return;
      }

      if (!formData.type) {
        setBackendError("Vui lòng chọn loại khoản thu");
        return;
      }

      if (formData.type === "MANDATORY" && (!formData.unitPrice || Number(formData.unitPrice) <= 0)) {
        setBackendError("Phí bắt buộc phải có đơn giá lớn hơn 0");
        return;
      }

      const payload = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        unitPrice: formData.unitPrice ? Number(formData.unitPrice) : 0
      };

      // Chỉ thêm status khi đang edit
      if (isEdit) {
        payload.status = formData.status;
      }

      if (isEdit) {
        await feeAPI.updateFee(formData._id, payload);
      } else {
        await feeAPI.createFee(payload);
      }

      await fetchFees();
      handleClose();
      alert(isEdit ? "Cập nhật thành công!" : "Tạo khoản thu thành công!");
    } catch (err) {
      setBackendError(err?.message || "Lỗi hệ thống");
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa khoản thu
  const handleDelete = async (feeId) => {
    if (!window.confirm("Bạn có chắc muốn xóa khoản thu này?")) return;

    try {
      await feeAPI.deleteFee(feeId);
      setFees((prev) => prev.filter((f) => f._id !== feeId));
      alert("Đã xóa thành công!");
    } catch (err) {
      alert(err.message || "Không thể xóa khoản thu!");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar user={user} navigate={navigate} onLogout={handleLogout} />

      <Box sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Typography variant="h4" gutterBottom>
          Quản lý khoản thu
        </Typography>

        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenCreate}>
          Tạo khoản thu
        </Button>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{isEdit ? "Cập nhật khoản thu" : "Tạo khoản thu"}</DialogTitle>

          <DialogContent>
            {backendError && <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>}

            <TextField
              label="Tên khoản thu"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Loại khoản thu"
              name="type"
              fullWidth
              margin="normal"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {feeTypes.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Đơn giá (VND)"
              name="unitPrice"
              fullWidth
              margin="normal"
              value={formData.unitPrice}
              onChange={handleChange}
              helperText={formData.type === "MANDATORY" ? "Bắt buộc nhập đơn giá > 0" : "Không bắt buộc với phí tự nguyện"}
            />

            <TextField
              label="Mô tả"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              value={formData.description}
              onChange={handleChange}
            />

            {isEdit && (
              <TextField
                select
                label="Trạng thái"
                name="status"
                fullWidth
                margin="normal"
                value={formData.status}
                onChange={handleChange}
                helperText="Chuyển sang 'Đã hoàn thành' để đóng khoản thu này"
              >
                {statusTypes.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* TABLE */}
        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên khoản thu</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Chưa có khoản thu nào
                    </TableCell>
                  </TableRow>
                ) : (
                  fees.map((fee) => (
                    <TableRow key={fee._id}>
                      <TableCell>{fee.name}</TableCell>

                      <TableCell>
                        {fee.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"}
                      </TableCell>

                      <TableCell>
                        {fee.unitPrice ? fee.unitPrice.toLocaleString() + " VND" : "-"}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "6px",
                            color: "#fff",
                            display: "inline-block",
                            backgroundColor:
                              fee.status === "ACTIVE" ? "green" : "blue",
                            textAlign: "center"
                          }}
                        >
                          {fee.status === "ACTIVE"
                            ? "Đang hiệu lực"
                            : "Đã hoàn thành"}
                        </Box>
                      </TableCell>

                      <TableCell>{fee.description || "-"}</TableCell>

                      <TableCell>
                        <Button color="primary" onClick={() => handleOpenEdit(fee)}>
                          Sửa
                        </Button>
                        <Button color="error" onClick={() => handleDelete(fee._id)}>
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default FeeManagement;