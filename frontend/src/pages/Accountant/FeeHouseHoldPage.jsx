import React, { useEffect, useState, useMemo } from "react";
import { feeAPI } from "../../services/apiService";

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
  Alert,
  Stack,
  Divider,
  CircularProgress,
  Snackbar,
} from "@mui/material";

function FeeHouseHoldPage() {
  const [tab, setTab] = useState(0); // 0: list, 1: stats
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    type: "",
    unitPrice: "",
    description: "",
    status: "ACTIVE",
  });

  // ===== STATISTICS =====
  const [statsData, setStatsData] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsFilter, setStatsFilter] = useState("ALL");

  const feeTypes = [
    { value: "MANDATORY", label: "Bắt buộc" },
    { value: "VOLUNTARY", label: "Tự nguyện" },
  ];

  const statusTypes = [
    { value: "ACTIVE", label: "Đang hiệu lực" },
    { value: "COMPLETED", label: "Đã hoàn thành" },
  ];

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const data = await feeAPI.getAllFees();
      setFees(data || []);
    } catch (err) {
      setError("Không thể tải danh sách khoản thu");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) =>
    setSnackbar({ open: true, message: msg, severity: "success" });
  const showError = (msg) =>
    setSnackbar({ open: true, message: msg, severity: "error" });

  const handleOpenCreate = () => {
    setIsEdit(false);
    setFormData({
      _id: "",
      name: "",
      type: "",
      unitPrice: "",
      description: "",
      status: "ACTIVE",
    });
    setOpen(true);
  };

  const handleOpenEdit = (fee) => {
    setIsEdit(true);
    setFormData({
      _id: fee._id,
      name: fee.name,
      type: fee.type,
      unitPrice: fee.unitPrice?.toString() || "",
      description: fee.description || "",
      status: fee.status,
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "unitPrice" && value && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      setError("");

      if (!formData.name || !formData.type) {
        setError("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const payload = {
        name: formData.name.trim(),
        type: formData.type,
        description: formData.description,
      };

      if (formData.type === "MANDATORY") {
        payload.unitPrice = Number(formData.unitPrice);
      }

      if (isEdit) {
        payload.status = formData.status;
        await feeAPI.updateFee(formData._id, payload);
        showSuccess("Cập nhật khoản thu thành công");
      } else {
        await feeAPI.createFee(payload);
        showSuccess("Tạo khoản thu thành công");
      }

      setOpen(false);
      fetchFees();
    } catch {
      showError("Lỗi khi lưu khoản thu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa khoản thu này?")) return;
    await feeAPI.deleteFee(id);
    fetchFees();
    showSuccess("Đã xóa khoản thu");
  };

  // ===== STATISTICS =====
  const handleViewStats = async (feeId) => {
    try {
      setStatsLoading(true);
      const data = await feeAPI.getFeeStatistics(feeId);
      setStatsData(data);
      setStatsFilter("ALL");
    } catch {
      showError("Không thể tải báo cáo");
    } finally {
      setStatsLoading(false);
    }
  };

  const filteredDetails = useMemo(() => {
    if (!statsData?.details) return [];
    if (statsFilter === "ALL") return statsData.details;
    return statsData.details.filter((d) => d.status === statsFilter);
  }, [statsData, statsFilter]);

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={600}>
          Quản lý khoản thu (Accountant)
        </Typography>
        <Box>
          <Button
            variant={tab === 0 ? "contained" : "outlined"}
            onClick={() => setTab(0)}
            sx={{ mr: 1 }}
          >
            Danh sách khoản thu
          </Button>
          <Button
            variant={tab === 1 ? "contained" : "outlined"}
            onClick={() => setTab(1)}
          >
            Báo cáo thống kê
          </Button>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {tab === 0 && (
        <>
          <Button variant="contained" onClick={handleOpenCreate} sx={{ mb: 2 }}>
            Tạo khoản thu mới
          </Button>

          {loading ? (
            <CircularProgress />
          ) : (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fees.map((f) => (
                    <TableRow key={f._id}>
                      <TableCell>{f.name}</TableCell>
                      <TableCell>
                        {f.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"}
                      </TableCell>
                      <TableCell>
                        {f.unitPrice?.toLocaleString() || "-"}
                      </TableCell>
                      <TableCell>{f.status}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenEdit(f)}>Sửa</Button>
                        <Button
                          color="error"
                          onClick={() => handleDelete(f._id)}
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </>
      )}

      {tab === 1 && (
        <>
          <TextField
            select
            fullWidth
            label="Chọn khoản thu"
            onChange={(e) => handleViewStats(e.target.value)}
          >
            {fees.map((f) => (
              <MenuItem key={f._id} value={f._id}>
                {f.name}
              </MenuItem>
            ))}
          </TextField>

          {statsLoading && <CircularProgress sx={{ mt: 3 }} />}

          {statsData && (
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography fontWeight={600}>
                Tổng quan: {statsData.fee_info.name}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã hộ</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>Phải thu</TableCell>
                    <TableCell>Đã thu</TableCell>
                    <TableCell>Còn thiếu</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDetails.map((r) => (
                    <TableRow key={r.household_id}>
                      <TableCell>{r.household_code}</TableCell>
                      <TableCell>{r.address}</TableCell>
                      <TableCell>{r.required.toLocaleString()}</TableCell>
                      <TableCell>{r.paid.toLocaleString()}</TableCell>
                      <TableCell>{r.remaining.toLocaleString()}</TableCell>
                      <TableCell>{r.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEdit ? "Cập nhật khoản thu" : "Tạo khoản thu"}
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Tên khoản thu"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            select
            label="Loại"
            fullWidth
            margin="normal"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {feeTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Đơn giá"
            fullWidth
            margin="normal"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            disabled={formData.type === "VOLUNTARY"}
          />

          <TextField
            label="Mô tả"
            fullWidth
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {isEdit && (
            <TextField
              select
              label="Trạng thái"
              fullWidth
              margin="normal"
              name="status"
              value={formData.status}
              onChange={handleChange}
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
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default FeeHouseHoldPage;
