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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { feeAPI } from "../../services/apiService";

function FeeHouseHoldPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const data = await feeAPI.getAllFees();
      setFees(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <Box sx={{ p: 4, width: "100%", backgroundColor: "#fff" }}>
      {/* Phần tiêu đề và cụm nút góc phải */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          Quản lý khoản thu
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            DANH SÁCH KHOẢN THU
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#1976d2",
              borderColor: "#1976d2",
              textTransform: "none",
            }}
          >
            BÁO CÁO THỐNG KÊ
          </Button>
        </Stack>
      </Stack>

      {/* Nút Tạo khoản thu mới */}
      <Button
        variant="contained"
        sx={{
          mb: 3,
          backgroundColor: "#1976d2",
          px: 3,
          py: 1,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        TẠO KHOẢN THU MỚI
      </Button>

      {/* Bảng dữ liệu */}
      <Paper
        elevation={1}
        sx={{ borderRadius: "4px", border: "1px solid #e0e0e0" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Tên khoản thu</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Loại</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Đơn giá</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mô tả</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 8, color: "#666" }}
                >
                  Chưa có khoản thu nào. Nhấn "Tạo khoản thu mới" để bắt đầu.
                </TableCell>
              </TableRow>
            ) : (
              fees.map((fee) => (
                <TableRow key={fee._id} hover>
                  <TableCell>{fee.name}</TableCell>
                  <TableCell>
                    {fee.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"}
                  </TableCell>
                  <TableCell>
                    {fee.unitPrice ? `${fee.unitPrice.toLocaleString()}đ` : "-"}
                  </TableCell>
                  <TableCell>
                    {fee.status === "ACTIVE" ? "Đang thu" : "Kết thúc"}
                  </TableCell>
                  <TableCell>{fee.description || "-"}</TableCell>
                  <TableCell>
                    {/* Các nút sửa/xóa có thể thêm ở đây */}
                    <Button size="small" sx={{ textTransform: "none" }}>
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default FeeHouseHoldPage;
