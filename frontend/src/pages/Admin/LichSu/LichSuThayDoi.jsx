import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddProfileModal from "../../../feature/profile/AddProfile";
import useAuthStore from "../../../store/authStore";

/* ================== MOCK DATA: LỊCH SỬ THAY ĐỔI THEO HỘ DÂN ================== */

const mockHouseholdChanges = [
  {
    householdCode: "HD00123",
    cccdChuHo: "012345678901",
    chuHo: "Nguyễn Văn A",
    changeCount: 3,
    lastChangeAt: "16/12/2025 16:40",
  },
  {
    householdCode: "HD00124",
    cccdChuHo: "012345678902",
    chuHo: "Trần Thị B",
    changeCount: 1,
    lastChangeAt: "15/12/2025 09:10",
  },
  {
    householdCode: "HD00125",
    cccdChuHo: "012345678903",
    chuHo: "Lê Văn C",
    changeCount: 2,
    lastChangeAt: "15/12/2025 11:25",
  },
  {
    householdCode: "HD00126",
    cccdChuHo: "012345678904",
    chuHo: "Phạm Thị D",
    changeCount: 4,
    lastChangeAt: "16/12/2025 10:20",
  },
];

/* ================== TABLE ================== */

function HouseholdChangeTable({ rows, rolePrefix }) {
  const navigate = useNavigate();

  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

  const visibleRows = useMemo(
    () => rows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),
    [rows, page]
  );

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid #EEF2F7",
        }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#F8FAFC",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#0F172A",
                  borderBottom: "1px solid #E5E7EB",
                  py: 1.25,
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell align="center" sx={{ width: 120 }}>Mã hộ dân</TableCell>
              <TableCell align="center" sx={{ width: 170 }}>CCCD chủ hộ</TableCell>
              <TableCell align="left" sx={{ width: 240 }}>Chủ hộ</TableCell>
              <TableCell align="center" sx={{ width: 150 }}>
                Số lượng thay đổi
              </TableCell>
              <TableCell align="center" sx={{ width: 200 }}>Lần thay đổi gần nhất</TableCell>
              <TableCell align="center" sx={{ width: 150 }}>
                Chi tiết
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row, idx) => (
              <TableRow align="center"
                key={row.householdCode}
                hover
                sx={{
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FCFDFF",
                  "& td": {
                    fontSize: "14px",
                    color: "#111827",
                    borderBottom: "1px solid #EEF2F7",
                    py: 1.25,
                  },
                }}
              >
                <TableCell align="center" sx={{ color: "#0F172A" }}>
                  {row.householdCode}
                </TableCell>

                <TableCell align="center"
                  sx={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    color: "#334155",
                  }}
                >
                  {row.cccdChuHo}
                </TableCell>

                <TableCell 
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={row.chuHo}
                >
                  {row.chuHo}
                </TableCell>

                <TableCell align="center">
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 36,
                      height: 28,
                      px: 1,
                    }}
                  >
                    {row.changeCount}
                  </Box>
                </TableCell>

                <TableCell align="center" sx={{ color: "#475569" }}>
                  {row.lastChangeAt}
                </TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontSize: "13px",
                      borderRadius: "10px",
                      px: 2,
                      borderColor: "#BFDBFE",
                      color: "#1D4ED8",
                      backgroundColor: "#FFFFFF",
                      "&:hover": {
                        borderColor: "#93C5FD",
                        backgroundColor: "#EFF6FF",
                      },
                    }}
                    onClick={() =>
                      navigate(
                        `${rolePrefix}/lichsuthaydoi/chi-tiet/${row.householdCode}`
                      )
                    }
                  >
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, v) => setPage(v)}
          color="primary"
          size="small"
        />
      </Box>
    </Box>
  );
}

/* ================== PAGE ================== */

export default function LichSuThayDoiTheoHoDan() {
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);
  const [rows] = useState(mockHouseholdChanges);

  // ✅ lấy rolePrefix giống Sidebar
  const { user: authUser } = useAuthStore();
  const userRole = authUser?.role?.role_name;
  const rolePrefix =
    userRole === "HAMLET LEADER"
      ? "/leader"
      : userRole === "ACCOUNTANT"
      ? "/accountant"
      : "";

  return (
    <Box sx={{ padding: "24px 32px" }}>
      <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
        Lịch sử thay đổi của hộ dân
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
          p: 2,
        }}
      >
        <HouseholdChangeTable rows={rows} rolePrefix={rolePrefix} />
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
