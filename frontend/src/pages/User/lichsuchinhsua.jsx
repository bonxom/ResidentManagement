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
import MainLayoutForUser from "../../layout/MainLayoutForUser";
import AddProfileModal from "../../feature/profile/AddProfile";

/* ================== DATA ẢO ================== */

// Thành viên hiện tại
const residents = [
  { id: 1, cccd: "012345678901", fullName: "Nguyễn Văn A", relation: "Chủ hộ", dob: "12/03/1980" },
  { id: 2, cccd: "012345678902", fullName: "Trần Thị B", relation: "Vợ", dob: "20/11/1985" },
  { id: 3, cccd: "012345678903", fullName: "Nguyễn Văn C", relation: "Con", dob: "05/04/2010" },
];

// 🔥 LỊCH SỬ THÊM / XÓA (DATA ẢO)
const mockHistory = [
  {
    logId: "log_001",
    time: "15/12/2025 08:30",
    action: "ADD",
    cccd: "012345678904",
    fullName: "Lê Văn D",
    relation: "Anh trai",
    dob: "15/06/1978",
  },
  {
    logId: "log_002",
    time: "15/12/2025 09:10",
    action: "DELETE",
    cccd: "012345678903",
    fullName: "Nguyễn Văn C",
    relation: "Con",
    dob: "05/04/2010",
  },
  {
    logId: "log_003",
    time: "16/12/2025 14:05",
    action: "ADD",
    cccd: "012345678905",
    fullName: "Phạm Thị E",
    relation: "Cháu",
    dob: "22/08/2015",
  },
  {
    logId: "log_004",
    time: "16/12/2025 16:40",
    action: "DELETE",
    cccd: "012345678902",
    fullName: "Trần Thị B",
    relation: "Vợ",
    dob: "20/11/1985",
  },
];

/* ================== BẢNG LỊCH SỬ ================== */

function HistoryTable({ history }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(history.length / ROWS_PER_PAGE) || 1;
  const visibleRows = history.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Số CCCD</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Quan hệ</TableCell>
              <TableCell>Ngày sinh</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.logId} hover>
                <TableCell>{row.time}</TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: row.action === "ADD" ? "#2e7d32" : "#d32f2f",
                  }}
                >
                  {row.action === "ADD" ? "Thêm thành viên" : "Xóa thành viên"}
                </TableCell>
                <TableCell>{row.cccd}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.relation}</TableCell>
                <TableCell>{row.dob}</TableCell>
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
        />
      </Box>
    </Box>
  );
}

/* ================== PAGE ================== */

export default function LichSuPheDuyet() {
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);

  // ✅ GẮN DATA ẢO TRỰC TIẾP VÀO STATE
  const [history, setHistory] = useState(mockHistory);

  return (
    <MainLayoutForUser>
      <Box sx={{ padding: "24px 32px" }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
          Lịch sử thêm / xóa thành viên hộ dân
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
      </Box>

      <AddProfileModal
        open={openAddProfileModal}
        onClose={() => setOpenAddProfileModal(false)}
        currentData={{}}
        onSubmit={() => {}}
      />
    </MainLayoutForUser>
  );
}
