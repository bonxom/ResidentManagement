import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { feeAPI, requestAPI } from "../../../api/apiService";

const statusMap = {
  UNPAID: { label: "Chưa nộp", color: "error" },
  PARTIAL: { label: "Đóng thiếu", color: "warning" },
  COMPLETED: { label: "Đã đủ", color: "success" },
  CONTRIBUTED: { label: "Đã đóng góp", color: "success" },
  NO_CONTRIBUTION: { label: "Chưa đóng góp", color: "default" },
};

function StatusChip({ status }) {
  const { label, color } = statusMap[status] || { label: status || "N/A", color: "default" };
  return <Chip size="small" label={label} color={color} />;
}

export default function KhoanNop() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [payLoading, setPayLoading] = useState(false);

  const fetchFees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await feeAPI.getMyHouseholdFees();
      setFees(data || []);
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Không thể tải danh sách khoản thu.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const filteredFees = useMemo(() => {
    if (!searchText.trim()) return fees;
    const q = searchText.toLowerCase();
    return fees.filter((fee) => fee.name?.toLowerCase().includes(q));
  }, [fees, searchText]);

  const openPayDialog = (fee) => {
    setSelectedFee(fee);
    const remaining = fee.remainingAmount ?? fee.remaining ?? "";
    setAmount(remaining > 0 ? remaining.toString() : "");
    setNote("");
    setPayDialogOpen(true);
    setSuccess(null);
    setError(null);
  };

  const handleSubmitPayment = async () => {
    if (!selectedFee) return;
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Số tiền không hợp lệ.");
      return;
    }
    setPayLoading(true);
    setError(null);
    try {
      await requestAPI.createPayment({
        feeId: selectedFee.feeId || selectedFee._id,
        amount: value,
        note: note || undefined,
      });
      setSuccess("Đã gửi yêu cầu thanh toán. Chờ tổ trưởng duyệt.");
      setPayDialogOpen(false);
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Gửi yêu cầu thất bại.";
      setError(msg);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "24px 32px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
          Khoản thu của hộ gia đình
        </Typography>
        <Button variant="contained" onClick={fetchFees}>
          Làm mới
        </Button>
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

      <Box sx={{ backgroundColor: "white", borderRadius: "12px", p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          label="Tìm kiếm khoản thu"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên khoản thu</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell align="right">Định mức</TableCell>
                <TableCell align="right">Đã nộp</TableCell>
                <TableCell align="right">Còn thiếu</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Hộ gia đình của bạn chưa có khoản thu nào.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFees.map((fee) => (
                  <TableRow key={fee.feeId || fee._id}>
                    <TableCell>{fee.name}</TableCell>
                    <TableCell>{fee.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"}</TableCell>
                    <TableCell align="right">
                      {fee.requiredAmount ? fee.requiredAmount.toLocaleString() + " VND" : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {fee.paidAmount ? fee.paidAmount.toLocaleString() + " VND" : "0"}
                    </TableCell>
                    <TableCell align="right">
                      {fee.remainingAmount ? fee.remainingAmount.toLocaleString() + " VND" : "0"}
                    </TableCell>
                    <TableCell>
                      <StatusChip status={fee.status} />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => openPayDialog(fee)}
                        disabled={fee.status === "COMPLETED"}
                      >
                        Thanh toán
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={payDialogOpen} onClose={() => setPayDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Gửi yêu cầu thanh toán</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography fontWeight={600}>{selectedFee?.name}</Typography>
          <TextField
            label="Số tiền muốn nộp"
            value={amount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*$/.test(v)) setAmount(v);
            }}
            fullWidth
            size="small"
            InputProps={{ endAdornment: <span style={{ color: "#666", fontSize: 12 }}>VND</span> }}
          />
          <TextField
            label="Ghi chú (tuỳ chọn)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            size="small"
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setPayDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSubmitPayment} disabled={payLoading}>
            {payLoading ? <CircularProgress size={20} /> : "Gửi yêu cầu"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
