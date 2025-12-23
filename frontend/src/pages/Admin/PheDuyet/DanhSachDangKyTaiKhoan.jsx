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
  Chip,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import DangKyTaiKhoanForm from "../../../feature/admin/Form/DangKyTaiKhoanForm";
import { requestAPI } from "../../../api/apiService";

const tabs = [
  { key: "REGISTER", label: "Yêu cầu đăng ký tài khoản" },
  { key: "UPDATE_INFO", label: "Yêu cầu cập nhật thông tin" },
];

function StatusChip({ status }) {
  const map = {
    PENDING: { label: "Chờ duyệt", color: "warning" },
    APPROVED: { label: "Đã duyệt", color: "success" },
    REJECTED: { label: "Từ chối", color: "error" },
  };
  const { label, color } = map[status] || { label: status || "N/A", color: "default" };
  return <Chip size="small" label={label} color={color} />;
}

export default function DanhSachDangKyTaiKhoan() {
  const [activeTab, setActiveTab] = useState("REGISTER");
  const [registerRequests, setRegisterRequests] = useState([]);
  const [updateRequests, setUpdateRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const [registerRes, updateRes] = await Promise.all([
        requestAPI.getRequests({ type: "REGISTER", status: "PENDING" }),
        requestAPI.getRequests({ type: "UPDATE_INFO", status: "PENDING" }),
      ]);
      setRegisterRequests(registerRes || []);
      setUpdateRequests(updateRes || []);
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Không thể tải danh sách yêu cầu";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const dataSource = activeTab === "REGISTER" ? registerRequests : updateRequests;

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return dataSource;
    const q = searchText.toLowerCase();
    return dataSource.filter((req) => {
      const requester = req.requester || {};
      return (
        requester.name?.toLowerCase().includes(q) ||
        requester.email?.toLowerCase().includes(q) ||
        requester.userCardID?.toString().includes(q)
      );
    });
  }, [dataSource, searchText]);

  const handleReview = async (request, status) => {
    setProcessingId(request._id);
    setError(null);
    try {
      await requestAPI.reviewRequest(request._id, status);
      if (request.type === "REGISTER") {
        setRegisterRequests((prev) => prev.filter((r) => r._id !== request._id));
      } else {
        setUpdateRequests((prev) => prev.filter((r) => r._id !== request._id));
      }
      if (selectedRequest?._id === request._id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      const msg = err?.message || err?.customMessage || "Xử lý yêu cầu thất bại";
      setError(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const renderActionButtons = (request) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="outlined"
        color="success"
        size="small"
        disabled={processingId === request._id}
        onClick={() => handleReview(request, "APPROVED")}
      >
        Duyệt
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        disabled={processingId === request._id}
        onClick={() => handleReview(request, "REJECTED")}
      >
        Từ chối
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => setSelectedRequest(request)}
        sx={{ textTransform: "none" }}
      >
        Xem
      </Button>
    </Box>
  );

  const renderRow = (request) => {
    const requester = request.requester || {};
    const household = requester.household?.houseHoldID || requester.household || "—";
    const roleName = requester.role?.role_name || "MEMBER";
    const changeSummary =
      request.type === "UPDATE_INFO"
        ? Object.keys(request.requestData || {})
            .filter((key) => key !== "reason")
            .join(", ")
        : "—";

    return (
      <TableRow key={request._id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
        <TableCell sx={{ padding: "12px 16px" }}>{requester.name || "Chưa cập nhật"}</TableCell>
        <TableCell sx={{ padding: "12px 16px" }}>{requester.email || "—"}</TableCell>
        <TableCell sx={{ padding: "12px 16px" }}>{requester.userCardID || "—"}</TableCell>
        {activeTab === "REGISTER" && (
          <TableCell sx={{ padding: "12px 16px" }}>{roleName}</TableCell>
        )}
        <TableCell sx={{ padding: "12px 16px" }}>{household}</TableCell>
        {activeTab === "UPDATE_INFO" && (
          <TableCell sx={{ padding: "12px 16px" }}>
            {changeSummary || "Không có dữ liệu"}
          </TableCell>
        )}
        <TableCell sx={{ padding: "12px 16px" }}>
          <StatusChip status={request.status} />
        </TableCell>
        <TableCell sx={{ padding: "12px 16px" }}>{renderActionButtons(request)}</TableCell>
      </TableRow>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Quản lý yêu cầu tài khoản
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

      <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "contained" : "outlined"}
            onClick={() => setActiveTab(tab.key)}
            sx={{ textTransform: "none" }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          background: "#f7f9fc",
          padding: "16px",
          borderRadius: "12px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label="Tìm kiếm (Tên / Email / CCCD)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  Họ và tên
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  CCCD/ID
                </TableCell>
                {activeTab === "REGISTER" && (
                  <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                    Vai trò
                  </TableCell>
                )}
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  Mã hộ gia đình
                </TableCell>
                {activeTab === "UPDATE_INFO" && (
                  <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                    Trường cần cập nhật
                  </TableCell>
                )}
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "12px 16px" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center", py: 3 }}>
                    Không có yêu cầu nào.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((request) => renderRow(request))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <DangKyTaiKhoanForm
        open={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        onApprove={() => selectedRequest && handleReview(selectedRequest, "APPROVED")}
        onReject={() => selectedRequest && handleReview(selectedRequest, "REJECTED")}
      />
    </div>
  );
}
