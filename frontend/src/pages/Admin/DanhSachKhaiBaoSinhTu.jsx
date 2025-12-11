import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function DanhSachKhaiBaoSinhTu() {
  // Dữ liệu mẫu (giữ nguyên)//goi API sau
  const fullData = [
    {
      role: "Dân cư",
      name: "Nguyễn Văn A",
      houseHoldID: "HH001",
      chuHo: "Nguyễn Văn Chủ",
      status: "",
      classification: "Sinh",
      dateOfBirth: "01/01/2024",
      gender: "Nam",
      personalId: "", // Dưới 14 tuổi
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn B",
      houseHoldID: "HH002",
      chuHo: "Nguyễn Văn Hộ",
      status: "Mới sinh",
      classification: "Sinh",
      dateOfBirth: "15/05/1960",
      gender: "Nữ",
      personalId: "001234567891",
      address: "456 Đường DEF, Phường ABC, Quận 2, TP.HCM",
    },
    {
      role: "Kế toán",
      name: "Nguyễn Văn C",
      houseHoldID: "HH003",
      chuHo: "Nguyễn Văn Hộ",
      status: "",
      classification: "Tử",
      dateOfBirth: "20/03/2023",
      gender: "Nam",
      personalId: "", // Dưới 14 tuổi
      address: "789 Đường GHI, Phường DEF, Quận 3, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn D",
      houseHoldID: "HH001",
      chuHo: "Nguyễn Văn Chủ",
      status: "",
      classification: "Tử",
      dateOfBirth: "10/12/1950",
      gender: "Nam",
      personalId: "001234567893",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn A",
      houseHoldID: "HH002",
      chuHo: "Nguyễn Văn Hộ",
      status: "",
      classification: "Sinh",
      dateOfBirth: "05/06/2024",
      gender: "Nữ",
      personalId: "", // Dưới 14 tuổi
      address: "456 Đường DEF, Phường ABC, Quận 2, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn B",
      houseHoldID: "HH003",
      chuHo: "Nguyễn Văn Hộ",
      status: "",
      classification: "Tử",
      dateOfBirth: "22/08/1965",
      gender: "Nam",
      personalId: "001234567895",
      address: "789 Đường GHI, Phường DEF, Quận 3, TP.HCM",
    },
    {
      role: "Kế toán",
      name: "Nguyễn Văn C",
      houseHoldID: "HH001",
      chuHo: "Nguyễn Văn Chủ",
      status: "",
      classification: "Sinh",
      dateOfBirth: "30/11/2023",
      gender: "Nữ",
      personalId: "", // Dưới 14 tuổi
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn D",
      chuHo: "Nguyễn Văn Hộ",
      houseHoldID: "HH004",
      status: "",
      classification: "Tử",
      dateOfBirth: "18/07/1955",
      gender: "Nam",
      personalId: "001234567897",
      address: "999 Đường JKL, Phường GHI, Quận 4, TP.HCM",
    },
  ];

  // Data hiện tại có thể thay đổi
  const [data, setData] = useState(fullData);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("Tất cả");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Lọc chỉ người Chưa duyệt hoặc Mới sinh
  const handleFilterChuaDuyet = () => {
    setData((prev) =>
      prev.filter((item) => item.status === "" || item.status === "Mới sinh")
    );
  };

  // Tìm kiếm dựa trên data gốc
  const handleSearch = () => {
    let filtered = fullData;

    if (searchText.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.chuHo.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterRole !== "Tất cả") {
      filtered = filtered.filter((item) => item.role === filterRole);
    }

    setData(filtered);
  };

  // Cập nhật trạng thái phê duyệt
  const updateStatus = (index, newStatus) => {
    const newData = [...data];
    newData[index].status = newStatus;
    setData(newData);
  };

  // Mở modal khi click vào trạng thái
  const handleOpenModal = (item, index) => {
    setSelectedPerson(item);
    setSelectedIndex(index);
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPerson(null);
    setSelectedIndex(null);
  };

  // Cập nhật trạng thái từ modal
  const handleStatusChange = (newStatus) => {
    if (selectedIndex !== null) {
      const newData = [...data];
      newData[selectedIndex].status = newStatus;
      setData(newData);
    }
    handleCloseModal();
  };

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Danh sách khai báo sinh tử</h1>

          <button
            onClick={handleFilterChuaDuyet}
            style={{
              background: "#2962ff",
              color: "white",
              fontSize: "18px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Tạo mới
          </button>
        </div>

        {/* Khung tìm kiếm */}
        <div
          style={{
            marginTop: "20px",
            background: "#f1f3f6",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>
              Tìm kiếm (Tên người / Tên chủ hộ)
            </p>
            <input
              type="text"
              placeholder="🔍 Nhập nội dung..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>Lọc theo</p>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option>Tất cả</option>
              <option>Dân cư</option>
              <option>Kế toán</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            style={{
              height: "45px",
              padding: "0 20px",
              background: "#2962ff",
              color: "white",
              borderRadius: "8px",
              border: "none",
              alignSelf: "flex-end",
              cursor: "pointer",
            }}
          >
            Tìm kiếm
          </button>
        </div>

        {/* Bảng danh sách */}
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            borderRadius: "12px",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Vai trò
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Họ và tên
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Mã hộ gia đình
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Tên chủ hộ
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Phân loại
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Trạng thái sinh tử
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  <TableCell sx={{ padding: "16px" }}>{item.role}</TableCell>
                  <TableCell sx={{ padding: "16px" }}>{item.name}</TableCell>
                  <TableCell sx={{ padding: "16px" }}>
                    {item.houseHoldID}
                  </TableCell>
                  <TableCell sx={{ padding: "16px" }}>{item.chuHo}</TableCell>
                  <TableCell sx={{ padding: "16px" }}>
                    <span
                      style={{
                        background:
                          item.classification === "Sinh"
                            ? "#e8f5e9"
                            : "#ffebee",
                        color:
                          item.classification === "Sinh"
                            ? "#2e7d32"
                            : "#c62828",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.classification}
                    </span>
                  </TableCell>
                  <TableCell sx={{ padding: "16px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      {/* Dấu ✓ - Phê duyệt */}
                      <button
                        onClick={() => updateStatus(index, "Phê duyệt")}
                        style={{
                          background:
                            item.status === "Phê duyệt" ? "#4caf50" : "#e0e0e0",
                          color: item.status === "Phê duyệt" ? "white" : "#666",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          fontSize: "18px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        title="Phê duyệt"
                      >
                        ✓
                      </button>

                      {/* Dấu ✗ - Không phê duyệt */}
                      <button
                        onClick={() => updateStatus(index, "Không phê duyệt")}
                        style={{
                          background:
                            item.status === "Không phê duyệt"
                              ? "#f44336"
                              : "#e0e0e0",
                          color:
                            item.status === "Không phê duyệt"
                              ? "white"
                              : "#666",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          fontSize: "18px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        title="Không phê duyệt"
                      >
                        ✗
                      </button>

                      {/* Dấu ... - Mở modal */}
                      <button
                        onClick={() => handleOpenModal(item, index)}
                        style={{
                          background:
                            item.status === "" ? "#2196f3" : "#e0e0e0",
                          color: item.status === "" ? "white" : "#666",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          fontSize: "18px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        title="Xem chi tiết"
                      >
                        ...
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal hiển thị thông tin cá nhân */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Thông tin cá nhân - {selectedPerson?.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Họ và tên:
                  </Typography>
                  <Typography>{selectedPerson?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Mã hộ gia đình:
                  </Typography>
                  <Typography>{selectedPerson?.houseHoldID}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Tên chủ hộ:
                  </Typography>
                  <Typography>{selectedPerson?.chuHo}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Ngày sinh:
                  </Typography>
                  <Typography>{selectedPerson?.dateOfBirth}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Giới tính:
                  </Typography>
                  <Typography>{selectedPerson?.gender}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Số định danh cá nhân:
                  </Typography>
                  <Typography>
                    {selectedPerson?.personalId || "(Chưa đủ 14 tuổi)"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Địa chỉ:
                  </Typography>
                  <Typography>{selectedPerson?.address}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Vai trò:
                  </Typography>
                  <Typography>{selectedPerson?.role}</Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-end", gap: 1, p: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusChange("Phê duyệt")}
            >
              Phê duyệt
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusChange("Không phê duyệt")}
            >
              Không phê duyệt
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MainLayout>
  );
}
