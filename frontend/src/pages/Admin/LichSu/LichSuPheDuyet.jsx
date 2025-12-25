import React, { useState } from "react";
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
} from "@mui/material";
import AddProfileModal from "../../../feature/profile/AddProfile";

/* ================== MOCK DATA: LỊCH SỬ PHÊ DUYỆT TÀI KHOẢN HỘ DÂN ================== */

const mockHistory = [
  {
    logId: "hd_001",
    time: "15/12/2025 08:30",
    status: "APPROVED", // APPROVED | REJECTED | PENDING
    householdCode: "HD00123",
    cccdChuHo: "012345678901",
    chuHo: "Nguyễn Văn A",
    accountType: "Hộ dân",
    reviewer: "canbo_phuong01",
    note: "Hồ sơ đầy đủ, hợp lệ",
  },
  {
    logId: "hd_002",
    time: "15/12/2025 09:10",
    status: "REJECTED",
    householdCode: "HD00124",
    cccdChuHo: "012345678902",
    chuHo: "Trần Thị B",
    accountType: "Hộ dân",
    reviewer: "canbo_phuong02",
    note: "Thiếu ảnh CCCD",
  },
  {
    logId: "hd_003",
    time: "16/12/2025 14:05",
    status: "APPROVED",
    householdCode: "HD00125",
    cccdChuHo: "012345678903",
    chuHo: "Lê Văn C",
    accountType: "Hộ dân",
    reviewer: "canbo_phuong01",
    note: "Đã xác minh thông tin",
  },
  {
    logId: "hd_004",
    time: "16/12/2025 16:40",
    status: "PENDING",
    householdCode: "HD00126",
    cccdChuHo: "012345678904",
    chuHo: "Phạm Thị D",
    accountType: "Hộ dân",
    reviewer: "-",
    note: "Chờ cán bộ phê duyệt",
  },
];

/* ================== TABLE ================== */

function HistoryTable({ history }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(history.length / ROWS_PER_PAGE) || 1;
  const visibleRows = history.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const statusLabel = (status) => {
    if (status === "APPROVED") return "Đã duyệt";
    if (status === "REJECTED") return "Từ chối";
    return "Chờ duyệt";
  };

  const statusColor = (status) => {
    if (status === "APPROVED") return "#2e7d32";
    if (status === "REJECTED") return "#d32f2f";
    return "#ed6c02";
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Mã hộ dân</TableCell>
              <TableCell>CCCD chủ hộ</TableCell>
              <TableCell>Chủ hộ</TableCell>
              <TableCell>Loại tài khoản</TableCell>
              <TableCell>Người duyệt</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.logId} hover>
                <TableCell>{row.time}</TableCell>

                <TableCell sx={{ fontWeight: 700, color: statusColor(row.status) }}>
                  {statusLabel(row.status)}
                </TableCell>

                <TableCell>{row.householdCode}</TableCell>
                <TableCell>{row.cccdChuHo}</TableCell>
                <TableCell>{row.chuHo}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell>{row.reviewer}</TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </Box>
  );
}

/* ================== PAGE ================== */

export default function LichSuPheDuyetTaiKhoanHoDan() {
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);

  const [history, setHistory] = useState(mockHistory);

  return (
    <Box sx={{ padding: "24px 32px" }}>
      <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
        Lịch sử phê duyệt tài khoản hộ dân
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
          p: 2,
        }}
      >
        <HistoryTable history={history} />
      </Box>

      <AddProfileModal
        open={openAddProfileModal}
        onClose={() => setOpenAddProfileModal(false)}
        currentData={{}}
        onSubmit={() => {}}
      />
    </Box>
  );
}
