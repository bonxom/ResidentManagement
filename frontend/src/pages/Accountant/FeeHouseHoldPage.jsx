import React, { useEffect, useState } from "react";
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
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import useAuthStore from "../../store/authStore";
import { feeAPI } from "../../services/apiService";
import FeeForm from "./form/FeeForm";

function FeeHouseHoldPage() {
  const { user } = useAuthStore();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  // tab: 0 = danh sách, 1 = thống kê
  const [tab, setTab] = useState(0);

  const [openForm, setOpenForm] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  /* ================= FETCH ================= */
  const fetchFees = async () => {
    try {
      setLoading(true);
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

  /* ================= CREATE / UPDATE ================= */
  const handleSubmitFee = async (formData) => {
    try {
      if (formData._id) {
        const updated = await feeAPI.updateFee(formData._id, formData);
        setFees((prev) =>
          prev.map((f) => (f._id === updated._id ? updated : f))
        );
      } else {
        const created = await feeAPI.createFee(formData);
        setFees((prev) => [...prev, created]);
      }
      setOpenForm(false);
      setSelectedFee(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteFee = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khoản thu này?")) return;
    try {
      await feeAPI.deleteFee(id);
      setFees((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= THỐNG KÊ ================= */
  const totalFee = fees.reduce((sum, f) => sum + (f.unitPrice || 0), 0);

  const activeCount = fees.filter((f) => f.status === "ACTIVE").length;

  /* ================= UI ================= */
  return (
    <Box sx={{ p: 4, width: "100%", backgroundColor: "#fff" }}>
      {/* ===== Header ===== */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold">
          Quản lý khoản thu
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant={tab === 0 ? "contained" : "outlined"}
            onClick={() => setTab(0)}
          >
            DANH SÁCH KHOẢN THU
          </Button>
          <Button
            variant={tab === 1 ? "contained" : "outlined"}
            onClick={() => setTab(1)}
          >
            BÁO CÁO THỐNG KÊ
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* ================= TAB 0: DANH SÁCH ================= */}
      {tab === 0 && (
        <>
          <Button
            variant="contained"
            sx={{ mb: 3 }}
            onClick={() => {
              setSelectedFee(null);
              setOpenForm(true);
            }}
          >
            TẠO KHOẢN THU MỚI
          </Button>

          <Paper elevation={1}>
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Đang tải dữ liệu...
                    </TableCell>
                  </TableRow>
                ) : fees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Chưa có khoản thu
                    </TableCell>
                  </TableRow>
                ) : (
                  fees.map((fee) => (
                    <TableRow key={fee._id} hover>
                      <TableCell>{fee.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            fee.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"
                          }
                          color="info"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {fee.unitPrice
                          ? fee.unitPrice.toLocaleString() + " VND"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            fee.status === "ACTIVE"
                              ? "Đang hiệu lực"
                              : "Kết thúc"
                          }
                          color={
                            fee.status === "ACTIVE" ? "success" : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{fee.description || "-"}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            onClick={() => {
                              setSelectedFee(fee);
                              setOpenForm(true);
                            }}
                          >
                            SỬA
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleDeleteFee(fee._id)}
                          >
                            XÓA
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}

      {/* ================= TAB 1: BÁO CÁO ================= */}
      {tab === 1 && (
        <>
          <Stack direction="row" spacing={4} sx={{ mb: 4 }}>
            <Paper sx={{ p: 3, minWidth: 220 }}>
              <Typography variant="subtitle2">Tổng số khoản thu</Typography>
              <Typography variant="h5">{fees.length}</Typography>
            </Paper>

            <Paper sx={{ p: 3, minWidth: 220 }}>
              <Typography variant="subtitle2">Đang hiệu lực</Typography>
              <Typography variant="h5">{activeCount}</Typography>
            </Paper>

            <Paper sx={{ p: 3, minWidth: 220 }}>
              <Typography variant="subtitle2">Tổng đơn giá</Typography>
              <Typography variant="h5">
                {totalFee.toLocaleString()} VND
              </Typography>
            </Paper>
          </Stack>

          <Paper elevation={1}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên khoản thu</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.map((f) => (
                  <TableRow key={f._id}>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>
                      {f.unitPrice
                        ? f.unitPrice.toLocaleString() + " VND"
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {f.status === "ACTIVE" ? "Đang hiệu lực" : "Kết thúc"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}

      {/* ===== MODAL FORM ===== */}
      <FeeForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
          setSelectedFee(null);
        }}
        onSubmit={handleSubmitFee}
        initialData={selectedFee}
      />
    </Box>
  );
}

export default FeeHouseHoldPage;
