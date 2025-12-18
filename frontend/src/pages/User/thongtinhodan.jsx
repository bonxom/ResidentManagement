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
  Checkbox,
  Paper,
  Pagination,
} from "@mui/material";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useRoleNavigation } from "../../hooks/useRoleNavigation";
import AddProfileModal from "../../feature/profile/AddProfile";

// ===== DỮ LIỆU ẢO (3 dòng để test) =====
const residents = [
  { id: 1, cccd: "012345678901", fullName: "Nguyễn Văn A", relation: "Chủ hộ", dob: "12/03/1980" },
  { id: 2, cccd: "012345678902", fullName: "Trần Thị B", relation: "Vợ", dob: "20/11/1985" },
  { id: 3, cccd: "012345678903", fullName: "Nguyễn Văn C", relation: "Con", dob: "05/04/2010" },
];

// ===== COMPONENT BẢNG =====
function ResidentsTable({ residents, selected, setSelected }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const { navigateWithRole } = useRoleNavigation();

  const pageCount = Math.ceil(residents.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const visibleRows = residents.slice(start, start + ROWS_PER_PAGE);

  const handleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    const idsOnPage = visibleRows.map((r) => r.id);

    if (e.target.checked) {
      setSelected((prev) => Array.from(new Set([...prev, ...idsOnPage])));
    } else {
      setSelected((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    }
  };

  const isAllSelectedOnPage =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selected.includes(row.id));

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isAllSelectedOnPage}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Số CCCD</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Quan hệ với chủ hộ</TableCell>
              <TableCell>Ngày tháng năm sinh</TableCell>
              <TableCell align="center">Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => {
              const checked = selected.includes(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={checked}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={checked}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.cccd}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.relation}</TableCell>
                  <TableCell>{row.dob}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="text"
                      sx={{
                        textTransform: "none",
                        fontSize: "14px",
                        color: "#1E54D4",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => navigateWithRole('/ThongTinChiTiet')}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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

// ===== PAGE CHÍNH =====
export default function ThongTinHoDan() {
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // ✅ đưa residents vào state để xóa được
  const [residentList, setResidentList] = useState(residents);
  // ✅ đưa selected lên page để nút "Xóa thành viên" dùng được
  const [selected, setSelected] = useState([]);

  const handleAddRequest = (formData) => {
    console.log("Yêu cầu thêm thành viên:", formData);
    alert("Yêu cầu đã được gửi!");
    setOpenAddProfileModal(false);
  };

  const handleOpenAddMember = () => {
    setUserInfo({});
    setOpenAddProfileModal(true);
  };

  // ✅ XÓA THEO CÁC ID ĐÃ TICK
  const handleDeleteSelected = () => {
    if (selected.length === 0) {
      alert("Bạn chưa chọn thành viên nào để xóa.");
      return;
    }
    const ok = window.confirm(`Xóa ${selected.length} thành viên đã chọn?`);
    if (!ok) return;

    setResidentList((prev) => prev.filter((r) => !selected.includes(r.id)));
    setSelected([]);
  };

  return (
    <>
      <Box sx={{ padding: "24px 32px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
            Thông tin thành viên hộ dân
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              gap: 3,
            }}
          >
            {/* ✅ NÚT XÓA: bấm sẽ xóa các dòng đã tick */}
            <Button
              variant="contained"

              onClick={handleOpenAddMember}

//               onClick={handleDeleteSelected}

              sx={{
                backgroundColor: "#2D66F5",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "14px",
                fontWeight: "500",
                "&:hover": { backgroundColor: "#1E54D4" },
              }}
            >
              Xóa thành viên
            </Button>

            <Button
              variant="contained"
              onClick={handleOpenAddMember}
              sx={{
                backgroundColor: "#2D66F5",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "14px",
                fontWeight: "500",
                "&:hover": { backgroundColor: "#1E54D4" },
              }}
            >
              Thêm thành viên
            </Button>
          </Box>
        </Box>

        {/* SEARCH BOX */}
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
                  height: "40px",
                  "& .MuiInputBase-input": { padding: "10px 0px" },
                },
              }}
            />
          </Box>

          <Box sx={{ width: "220px" }}>
            <Typography sx={{ fontSize: "13px", mb: 1 }}>Lọc theo</Typography>

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
                <MenuItem value="hokhau">Hộ khẩu</MenuItem>
                <MenuItem value="nhankhau">Nhân khẩu</MenuItem>
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
              alignItems: "center",
              mt: "26px",
            }}
          >
            Tìm kiếm
          </Button>
        </Box>

        {/* TABLE AREA */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
            p: 2,
          }}
        >
          <ResidentsTable
            residents={residentList}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Box>

      <AddProfileModal
        open={openAddProfileModal}
        onClose={() => setOpenAddProfileModal(false)}
        currentData={userInfo}
        onSubmit={handleAddRequest}
      />
    </>
  );
}
