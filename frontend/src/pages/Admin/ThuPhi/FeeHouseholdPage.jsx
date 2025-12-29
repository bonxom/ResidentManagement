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
  Chip,
  Alert,
} from "@mui/material";
import { Sidebar, drawerWidth } from "../../../components/Sidebar";
import useAuthStore from "../../../store/authStore";
import { feeAPI } from "../../../api/apiService";
import { useNavigate } from "react-router-dom";

function FeeHouseholdPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [household, setHousehold] = useState(null);
  const [error, setError] = useState("");

  const statusMap = {
    UNPAID: { label: "Chưa nộp", color: "error" },
    PARTIAL: { label: "Còn nợ", color: "warning" },
    COMPLETED: { label: "Đã đủ", color: "success" },
    CONTRIBUTED: { label: "Đã đóng góp", color: "info" },
    NO_CONTRIBUTION: { label: "Chưa đóng góp", color: "default" },
  };

  useEffect(() => {
    const fetchHouseholdFees = async () => {
      setLoading(true);
      setError("");
      try {
        const householdId =
          typeof user?.household === "object"
            ? user.household?._id
            : user?.household;

        if (!householdId) {
          setError("Bạn chưa thuộc hộ khẩu nào.");
          setFees([]);
          setHousehold(null);
          return;
        }

        const data = await feeAPI.getHouseholdFeesByAdmin(householdId);
        setHousehold(data?.household || null);
        setFees(data?.fees || []);
      } catch (err) {
        console.error("Error loading household fees:", err);
        const message =
          err?.message || "Không thể tải danh sách khoản thu của hộ.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseholdFees();
  }, [user?.household]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar user={user} navigate={navigate} onLogout={signOut} />

      <Box sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Typography variant="h4" gutterBottom>
          Khoản thu của hộ gia đình
          {household?.name ? ` (${household.name})` : ""}
        </Typography>
        {household?.address && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {household.address}
          </Typography>
        )}

        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : error ? (
          <Alert severity="warning">{error}</Alert>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên khoản thu</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell align="right">Phải thu</TableCell>
                  <TableCell align="right">Đã thu</TableCell>
                  <TableCell align="right">Còn thiếu</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Hộ gia đình của bạn chưa có khoản thu nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  fees.map((fee) => {
                    const chip =
                      statusMap[fee.status] || {
                        label: fee.status || "N/A",
                        color: "default",
                      };
                    return (
                      <TableRow key={fee.feeId}>
                        <TableCell>{fee.name}</TableCell>

                        <TableCell>
                          {fee.type === "MANDATORY" ? "Bắt buộc" : "Tự nguyện"}
                        </TableCell>

                        <TableCell align="right">
                          {(fee.requiredAmount || 0).toLocaleString()} VND
                        </TableCell>
                        <TableCell align="right">
                          {(fee.paidAmount || 0).toLocaleString()} VND
                        </TableCell>
                        <TableCell align="right">
                          {(fee.remainingAmount || 0).toLocaleString()} VND
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={chip.label}
                            color={chip.color}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
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
