import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { requestAPI } from "../../../api/apiService";

const statusMap = {
  PENDING: { label: "Chờ duyệt", color: "warning" },
  APPROVED: { label: "Đã duyệt", color: "success" },
  REJECTED: { label: "Từ chối", color: "error" },
};

function StatusChip({ status }) {
  const { label, color } = statusMap[status] || { label: status || "N/A", color: "default" };
  return <Chip size="small" label={label} color={color} />;
}

export default function DanhSachThuTien() {
  const [requests, setRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestAPI.getRequests({ type: "PAYMENT", status: "PENDING" });
      setRequests(res || []);
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Không thể tải danh sách yêu cầu thanh toán";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = useMemo(() => {
    if (!searchText.trim()) return requests;
    const q = searchText.toLowerCase();
    return requests.filter((r) => {
      const requester = r.requester || {};
      const householdCode = requester.household?.houseHoldID || requester.household || "";
      const requesterName = requester.name || "";
      const feeName = r.requestData?.feeName || "";
      const note = r.requestData?.note || "";
      return (
        requesterName.toLowerCase().includes(q) ||
        householdCode.toLowerCase().includes(q) ||
        feeName.toLowerCase().includes(q) ||
        note.toLowerCase().includes(q)
      );
    });
  }, [requests, searchText]);

  const handleReview = async (request, status) => {
    setProcessingId(request._id);
    setError(null);
    try {
      await requestAPI.reviewRequest(request._id, status);
      setRequests((prev) => prev.filter((r) => r._id !== request._id));
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Xử lý yêu cầu thất bại";
      setError(msg);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Yêu cầu thanh toán
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={() => setSearchText("")}>
            Xóa tìm kiếm
          </Button>
          <Button variant="contained" onClick={fetchRequests}>
            Làm mới
          </Button>
        </Box>
      </Box>

      <Box sx={{ background: "#f7f9fc", p: 2, borderRadius: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Tìm kiếm (Tên chủ hộ / Mã hộ / Khoản thu / Ghi chú)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Chủ hộ</TableCell>
                <TableCell>Mã hộ</TableCell>
                <TableCell>Khoản thu</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Không có yêu cầu nào.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((req) => {
                  const requester = req.requester || {};
                  const householdCode = requester.household?.houseHoldID || requester.household || "—";
                  return (
                    <TableRow key={req._id}>
                      <TableCell>{requester.name || "—"}</TableCell>
                      <TableCell>{householdCode}</TableCell>
                      <TableCell>{req.requestData?.feeName || "—"}</TableCell>
                      <TableCell>
                        {req.requestData?.amount
                          ? Number(req.requestData.amount).toLocaleString() + " VND"
                          : "—"}
                      </TableCell>
                      <TableCell>{req.requestData?.note || "—"}</TableCell>
                      <TableCell>
                        <StatusChip status={req.status} />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            disabled={processingId === req._id}
                            onClick={() => handleReview(req, "APPROVED")}
                          >
                            Duyệt
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            disabled={processingId === req._id}
                            onClick={() => handleReview(req, "REJECTED")}
                          >
                            Từ chối
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
