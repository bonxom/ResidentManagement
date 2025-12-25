import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { Search, ArrowLeft, Eye } from "lucide-react";
import { householdAPI } from "../../../api/apiService";

// ===== COMPONENT BẢNG CHI TIẾT =====
function DetailTable({ data, loading, onViewMember }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(data.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const visibleRows = data.slice(start, start + ROWS_PER_PAGE);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography sx={{ color: "#666" }}>
          Không có dữ liệu tạm trú/tạm vắng
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>CCCD</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Họ và tên</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Quan hệ với chủ hộ
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Loại</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Từ ngày</TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="center">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell>{row.userCardID || "N/A"}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.relationshipWithHead || "Thành viên"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.type === "tamtru" ? "Tạm trú" : "Tạm vắng"}
                    color={row.type === "tamtru" ? "primary" : "error"}
                    size="small"
                    sx={{ fontWeight: "500", borderRadius: "6px" }}
                  />
                </TableCell>
                <TableCell>{formatDate(row.startDate)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewMember(row)}
                    startIcon={<Eye size={14} />}
                    sx={{ textTransform: "none", borderRadius: "6px" }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, value) => setPage(value)}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
}

// ===== PAGE CHÍNH =====
export default function ChiTietTamTruVangAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const householdId = location.state?.householdId;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!householdId) {
      setError("Không tìm thấy thông tin hộ dân");
      return;
    }
    fetchDetailData();
  }, [householdId]);

  const fetchDetailData = async () => {
    setLoading(true);
    try {
      const response = await householdAPI.getTamTruVangDetails(householdId);
      const { temporaryHistory } = response;

      if (!temporaryHistory) {
        setData([]);
        return;
      }

      // Kết hợp dữ liệu tạm trú và tạm vắng
      const formattedData = [];

      // Thêm dữ liệu tạm trú
      if (temporaryHistory.temporaryResidents) {
        temporaryHistory.temporaryResidents.forEach((resident) => {
          formattedData.push({
            _id: resident._id,
            userCardID: resident.userCardID,
            name: resident.name,
            relationshipWithHead: "Tạm trú",
            type: "tamtru",
            startDate: resident.startDate,
            endDate: resident.endDate,
            reason: resident.reason,
            job: resident.job,
            phoneNumber: resident.phoneNumber,
            dob: resident.dob,
            sex: resident.sex,
            birthLocation: resident.birthLocation,
            ethnic: resident.ethnic,
          });
        });
      }

      // Thêm dữ liệu tạm vắng
      if (temporaryHistory.temporaryAbsent) {
        temporaryHistory.temporaryAbsent.forEach((absent) => {
          formattedData.push({
            _id: absent._id,
            userCardID: absent.user?.userCardID || "N/A",
            name: absent.user?.name || "N/A",
            relationshipWithHead: "Tạm vắng",
            type: "tamvang",
            startDate: absent.startDate,
            endDate: absent.endDate,
            reason: absent.reason,
            temporaryAddress: absent.temporaryAddress,
          });
        });
      }

      setData(formattedData);
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tải dữ liệu chi tiết.");
    } finally {
      setLoading(false);
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userCardID?.includes(searchTerm)
  );

  return (
    <Box sx={{ padding: "24px 32px" }}>
      {/* Nút quay lại và Tiêu đề */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button
          onClick={() => navigate(-1)}
          sx={{ minWidth: "40px", color: "#666" }}
        >
          <ArrowLeft size={24} />
        </Button>
        <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
          Chi tiết Tạm trú / Tạm vắng hộ dân
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Thanh tìm kiếm nhanh */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          mb: 4,
        }}
      >
        <Typography sx={{ fontSize: "13px", mb: 1, fontWeight: "500" }}>
          Tìm kiếm thành viên
        </Typography>
        <TextField
          fullWidth
          placeholder="Nhập họ tên hoặc số CCCD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#777" />
              </InputAdornment>
            ),
            sx: { background: "#F1F3F6", borderRadius: "8px", height: "40px" },
          }}
        />
      </Box>

      {/* Bảng dữ liệu */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
          p: 2,
        }}
      >
        <DetailTable
          data={filteredData}
          loading={loading}
          onViewMember={(member) =>
            navigate("/leader/ThongTinChiTietMember", {
              state: { memberId: member._id },
            })
          }
        />
      </Box>
    </Box>
  );
}
