import React, { useEffect, useMemo, useState } from "react";
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
  Button,
  TextField,
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

const formatMoney = (v) => {
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed.toLocaleString("vi-VN") + " đ" : "-";
};

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString("vi-VN") : "-";

export default function LichSuGiaoDichTheoHoDan() {
  const [requests, setRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 10;

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestAPI.getRequests({ type: "PAYMENT" });
      setRequests(res || []);
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Không thể tải lịch sử yêu cầu";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchText, requests.length]);

  const filtered = useMemo(() => {
    if (!searchText.trim()) return requests;
    const q = searchText.toLowerCase();
    return requests.filter((req) => {
      const requester = req.requester || {};
      const householdCode = requester.household?.houseHoldID || requester.household || "";
      const feeName = req.requestData?.feeName || "";
      const note = req.requestData?.note || "";
      const statusLabel = statusMap[req.status]?.label || req.status || "";
      return (
        (requester.name || "").toLowerCase().includes(q) ||
        householdCode.toLowerCase().includes(q) ||
        feeName.toLowerCase().includes(q) ||
        note.toLowerCase().includes(q) ||
        statusLabel.toLowerCase().includes(q)
      );
    });
  }, [requests, searchText]);

  const pageCount = Math.ceil(filtered.length / ROWS_PER_PAGE) || 1;

  const visibleRows = useMemo(
    () => filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),
    [filtered, page]
  );

  return (
    <Box sx={{ padding: "24px 32px" }}>
      <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
        Lịch sử yêu cầu thanh toán
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            size="small"
            label="Tìm kiếm (Tên chủ hộ / Mã hộ / Khoản thu / Ghi chú / Trạng thái)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ flex: 1, mr: 2 }}
          />
          <Button variant="contained" onClick={fetchRequests}>
            Làm mới
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Chủ hộ</TableCell>
                    <TableCell>Mã hộ</TableCell>
                    <TableCell>Khoản thu</TableCell>
                    <TableCell align="right">Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Thời gian gửi</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Không có yêu cầu nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleRows.map((req) => {
                      const requester = req.requester || {};
                      const householdCode =
                        requester.household?.houseHoldID || requester.household || "-";
                      const statusInfo = statusMap[req.status] || {
                        label: req.status || "N/A",
                        color: "default",
                      };
                      return (
                        <TableRow key={req._id} hover>
                          <TableCell>{requester.name || "-"}</TableCell>
                          <TableCell>{householdCode}</TableCell>
                          <TableCell>{req.requestData?.feeName || "-"}</TableCell>
                          <TableCell align="right">
                            {formatMoney(req.requestData?.amount)}
                          </TableCell>
                          <TableCell>
                            <Chip size="small" label={statusInfo.label} color={statusInfo.color} />
                          </TableCell>
                          <TableCell>{formatDateTime(req.createdAt)}</TableCell>
                          <TableCell>{req.requestData?.note || "-"}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
