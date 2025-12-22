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

const residentsData = [
  {
    id: 1,
    cccd: "012345678901",
    fullName: "Nguyễn Văn A",
    relation: "Chủ hộ",
    dob: "12/03/1980",
  },
  {
    id: 2,
    cccd: "012345678902",
    fullName: "Trần Thị B",
    relation: "Vợ",
    dob: "20/11/1985",
  },
  {
    id: 3,
    cccd: "012345678903",
    fullName: "Nguyễn Văn C",
    relation: "Con",
    dob: "05/04/2010",
  },
];

export default function ThongTinHoDanPage() {
  const [page, setPage] = useState(1);

  return (
    <Box
      sx={{ p: "24px 32px", minHeight: "100vh", backgroundColor: "#F5F7FA" }}
    >
      {/* HEADER: Tiêu đề trang */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontSize: "26px", fontWeight: "600", color: "#1F2335" }}
        >
          Thông tin thành viên hộ dân
        </Typography>
      </Box>

      {/* SEARCH BOX: Đã thu nhỏ tỉ lệ y hệt bản gốc */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          backgroundColor: "white",
          padding: "20px 24px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* Ô tìm kiếm */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: "13px", mb: 0.8, color: "#666", fontWeight: 500 }}
          >
            Tìm kiếm
          </Typography>
          <TextField
            fullWidth
            placeholder="Nhập từ khóa..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#777" />
                </InputAdornment>
              ),
              sx: {
                background: "#F1F3F6",
                borderRadius: "8px",
                height: "40px", // Chiều cao chuẩn thu nhỏ
                fontSize: "14px",
                "& fieldset": { border: "none" },
              },
            }}
          />
        </Box>

        {/* Bộ lọc */}
        <Box sx={{ width: "200px" }}>
          <Typography
            sx={{ fontSize: "13px", mb: 0.8, color: "#666", fontWeight: 500 }}
          >
            Lọc theo
          </Typography>
          <Box
            sx={{
              backgroundColor: "#F1F3F6",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              px: 1.5,
            }}
          >
            <Filter size={16} color="#555" style={{ marginRight: 8 }} />
            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              variant="standard"
              disableUnderline
              IconComponent={() => <ChevronDown size={16} />}
              sx={{ fontSize: "14px" }}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="hokhau">Hộ khẩu</MenuItem>
              <MenuItem value="nhankhau">Nhân khẩu</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Nút Tìm kiếm */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2D66F5",
            borderRadius: "8px",
            textTransform: "none",
            height: "40px",
            width: "110px",
            fontSize: "14px",
            fontWeight: "500",
            mt: "24px", // Căn lề để thẳng hàng với input
            "&:hover": { backgroundColor: "#1E54D4" },
            boxShadow: "none",
          }}
        >
          Tìm kiếm
        </Button>
      </Box>

      {/* TABLE AREA: Bảng dữ liệu sạch sẽ */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#F8F9FB" }}>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "600", color: "#475467", fontSize: "14px" }}
                >
                  Số CCCD
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "600", color: "#475467", fontSize: "14px" }}
                >
                  Họ và tên
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "600", color: "#475467", fontSize: "14px" }}
                >
                  Quan hệ
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "600", color: "#475467", fontSize: "14px" }}
                >
                  Ngày sinh
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "600", color: "#475467", fontSize: "14px" }}
                >
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residentsData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: "14px", color: "#344054" }}>
                    {row.cccd}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "#344054" }}>
                    {row.fullName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "#344054" }}>
                    {row.relation}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "#344054" }}>
                    {row.dob}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      sx={{
                        textTransform: "none",
                        fontSize: "14px",
                        color: "#2D66F5",
                        fontWeight: "600",
                        "&:hover": {
                          textDecoration: "underline",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PHÂN TRANG */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #EAECF0",
          }}
        >
          <Pagination
            count={5}
            page={page}
            onChange={(e, v) => setPage(v)}
            shape="rounded"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}
