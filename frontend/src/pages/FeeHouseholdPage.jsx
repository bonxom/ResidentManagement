import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { Sidebar, drawerWidth } from "../components/Sidebar";
import useAuthStore from "../store/authStore";
import { feeAPI } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function FeeHouseholdPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyFees = async () => {
    try {
      const data = await feeAPI.getMyHouseholdFees();
      setFees(data);
    } catch (err) {
      console.error("Error loading household fees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFees();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar user={user} navigate={navigate} onLogout={signOut} />

      <Box sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Typography variant="h4" gutterBottom>
          Khoản thu của hộ gia đình
        </Typography>

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
                </TableRow>
              </TableHead>

              <TableBody>
                {fees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Hộ gia đình của bạn chưa có khoản thu nào.
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
                        {fee.unitPrice
                          ? fee.unitPrice.toLocaleString() + " VND"
                          : fee.type === "VOLUNTARY"
                          ? "Tự nguyện"
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={fee.status === "ACTIVE" ? "Đang hiệu lực" : "Đã hoàn thành"}
                          color={fee.status === "ACTIVE" ? "success" : "primary"}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>{fee.description || "-"}</TableCell>
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

export default FeeHouseholdPage;