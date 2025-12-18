import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useRoleNavigation } from "../../../hooks/useRoleNavigation";
import AddProfileModal from "../../../feature/profile/AddProfile";

// ===== DỮ LIỆU ẢO (KHOẢN NỘP) =====
const payments = [
  {
    id: 1,
    name: "Phí vệ sinh môi trường tháng 12",
    amount: "50.000đ",
    status: "Đã nộp",
  },
  {
    id: 2,
    name: "Quỹ khuyến học năm 2025",
    amount: "200.000đ",
    status: "Chưa nộp",
  },
  {
    id: 3,
    name: "Phí bảo trì thang máy",
    amount: "150.000đ",
    status: "Đang xử lý",
  },
];

// ===== TABLE =====
function PaymentsTable() {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const { navigateWithRole } = useRoleNavigation();

  const pageCount = Math.ceil(payments.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const visibleRows = payments.slice(start, start + ROWS_PER_PAGE);

  const getStatusColor = (status) => {
    if (status === "Đã nộp") return "#27AE60";
    if (status === "Chưa nộp") return "#E74C3C";
    return "#F39C12";
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên khoản nộp</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.amount}</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "white",
                      backgroundColor: getStatusColor(row.status),
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontSize: "14px",
                      color: "#1E54D4",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => navigateWithRole(`/payment-detail/${row.id}`)}
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
        />
      </Box>
    </Box>
  );
}

// ===== PAGE =====
export default function KhoanNop() {
  return (
    <Box sx={{ padding: "24px 32px" }}>
        {/* TITLE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
            Thông tin khoản nộp
          </Typography>
        </Box>

        {/* SEARCH AREA */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "white",
            padding: "22px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "13px", mb: 1 }}>Tìm kiếm</Typography>
            <TextField
              fullWidth
              placeholder="Nhập tên khoản nộp..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#777" />
                  </InputAdornment>
                ),
                sx: {
                  background: "#F1F3F6",
                  borderRadius: "8px",
                  height: "40px",
                  "& .MuiInputBase-input": {
                    padding: "10px 0px",
                  },
                },
              }}
            />
          </Box>

          {/* FILTER */}
          <Box sx={{ width: "220px" }}>
            <Typography sx={{ fontSize: "13px", mb: 1 }}>
              Lọc theo trạng thái
            </Typography>

            <Box
              sx={{
                backgroundColor: "#F1F3F6",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                px: 1,
                overflow: "hidden",
                border: "1px solid #bec0c5ff",
                "&:hover": { borderColor: "#000000ff" },
              }}
            >
              <Filter size={18} color="#555" style={{ marginLeft: 8, marginRight: 6 }} />

              <Select
                fullWidth
                displayEmpty
                variant="standard"
                disableUnderline
                IconComponent={() => <ChevronDown size={18} style={{ marginRight: 2 }} />}
                sx={{
                  flex: 1,
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  "& .MuiSelect-select": {
                    backgroundColor: "transparent !important",
                    paddingY: "10px",
                    paddingLeft: "6px",
                  },
                }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="paid">Đã nộp</MenuItem>
                <MenuItem value="unpaid">Chưa nộp</MenuItem>
                <MenuItem value="processing">Đang xử lý</MenuItem>
              </Select>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2D66F5",
              borderRadius: "8px",
              textTransform: "none",
              height: "40px",
              width: "120px",
              "&:hover": { backgroundColor: "#1E54D4" },
              mt: "26px",
            }}
          >
            Tìm kiếm
          </Button>
        </Box>

        {/* TABLE */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
            p: 2,
          }}
        >
          <PaymentsTable />
        </Box>
      </Box>
  );
}
