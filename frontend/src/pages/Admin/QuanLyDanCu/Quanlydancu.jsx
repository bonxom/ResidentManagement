import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Menu,
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
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import AddProfileModal from "../../../feature/profile/AddProfile";

// ===== DỮ LIỆU ẢO: DANH SÁCH HỘ DÂN =====
const households = [
  {
    id: 1,
    householdCode: "HK001",
    headName: "Nguyễn Văn A",
    createdAt: "01/01/2024",
    membersCount: 4,
  },
  {
    id: 2,
    householdCode: "HK002",
    headName: "Trần Thị B",
    createdAt: "15/02/2024",
    membersCount: 3,
  },
  {
    id: 3,
    householdCode: "HK003",
    headName: "Nguyễn Văn C",
    createdAt: "20/03/2024",
    membersCount: 5,
  },
];

// ===== COMPONENT BẢNG HỘ DÂN =====
function ResidentsTable({ selected, setSelected }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleViewDetail = () => {
    if (selectedRow) {
      navigate(`/ThongTinHoDanAdmin`);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      console.log('Xóa hộ dân:', selectedRow);
      // TODO: Implement delete logic
    }
    handleMenuClose();
  };

  const pageCount = Math.ceil(households.length / ROWS_PER_PAGE) || 1;
  const start = (page - 1) * ROWS_PER_PAGE;
  const visibleRows = households.slice(start, start + ROWS_PER_PAGE);

  const handleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const idsOnPage = visibleRows.map((r) => r.id);
      setSelected(idsOnPage);
    } else {
      setSelected([]);
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
                  indeterminate={
                    selected.length > 0 && selected.length < visibleRows.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Mã hộ dân</TableCell>
              <TableCell>Chủ hộ</TableCell>
              <TableCell>Ngày khởi tạo</TableCell>
              <TableCell>Số thành viên</TableCell>
              <TableCell>Thao tác</TableCell>
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
                  {/* CHECKBOX TỪNG DÒNG */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={checked}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>

                  <TableCell>{row.householdCode}</TableCell>
                  <TableCell>{row.headName}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.membersCount}</TableCell>

                  <TableCell>
                    <Button
                      onClick={(e) => handleMenuOpen(e, row)}
                      sx={{
                        minWidth: 36,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: '#eff6ff',
                        color: '#3b82f6',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#dbeafe',
                        },
                      }}
                    >
                      ⋯
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu dropdown cho 3-dot button */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 160,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <MenuItem
          onClick={handleViewDetail}
          sx={{
            py: 1.5,
            px: 2.5,
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f0f9ff",
              color: "#2563eb",
            },
          }}
        >
          Xem chi tiết
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            py: 1.5,
            px: 2.5,
            fontSize: "14px",
            fontWeight: 500,
            color: "#6b7280",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#fef2f2",
              color: "#ef4444",
            },
          }}
        >
          Xóa
        </MenuItem>
      </Menu>

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
export default function Quanlydancu() {
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [selected, setSelected] = useState([]);

  const handleAddRequest = (formData) => {
    console.log("Yêu cầu thêm thành viên:", formData);
    // TODO: Gửi formData lên backend
    alert("Yêu cầu đã được gửi!");
    setOpenAddProfileModal(false);
  };

  // Bấm nút "Thêm thành viên" -> mở form trống
  const handleOpenAddMember = () => {
    setUserInfo({});
    setOpenAddProfileModal(true);
  };

  return (
    <MainLayout>
      <Box sx={{ padding: "24px 32px" }}>
        {/* TITLE + BUTTON */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
            Thông tin hộ dân
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpenAddMember}
              disabled={selected.length === 0}
              sx={{
                backgroundColor: selected.length === 0 ? "#fca5a5" : "#ef4444",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "14px",
                fontWeight: "500",
                "&:hover": { 
                  backgroundColor: selected.length === 0 ? "#fca5a5" : "#c84848ff" 
                },
                "&.Mui-disabled": {
                  backgroundColor: "#fca5a5",
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              Xóa hộ dân
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
              Thêm hộ dân
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
          {/* SEARCH INPUT */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "13px", mb: 1 }}>Tìm kiếm</Typography>
            <TextField
              fullWidth
              placeholder="Nhập mã hộ dân, tên chủ hộ..."
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

          {/* FILTER SELECT */}
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
                "&:hover": {
                  borderColor: "#000000ff",
                },
              }}
            >
              <Filter
                size={18}
                color="#555"
                style={{ marginLeft: 8, marginRight: 6 }}
              />

              <Select
                fullWidth
                displayEmpty
                variant="standard"
                disableUnderline
                IconComponent={() => (
                  <ChevronDown size={18} style={{ marginRight: 2 }} />
                )}
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

          {/* SEARCH BUTTON */}
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
          <ResidentsTable selected={selected} setSelected={setSelected} />
        </Box>
      </Box>

      {/* MODAL THÊM THÀNH VIÊN */}
      <AddProfileModal
        open={openAddProfileModal}
        onClose={() => setOpenAddProfileModal(false)}
        currentData={userInfo}
        onSubmit={handleAddRequest}
      />
    </MainLayout>
  );
}
