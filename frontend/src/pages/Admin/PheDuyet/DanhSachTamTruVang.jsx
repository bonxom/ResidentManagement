import { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import TamTruVangForm from "../../../feature/admin/Form/TamTruVangForm";

export default function DanhSachTamTruVang() {
  // Dữ liệu mẫu (giữ nguyên)
  const fullData = [
    {
      role: "Dân cư",
      name: "Nguyễn Văn A",
      houseHoldID: "HH001",
      chuHo: "Nguyễn Văn Chủ",
      status: "",
      classification: "Tạm trú",
      dateOfBirth: "15/05/1990",
      gender: "Nam",
      personalId: "001234567890",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn B",
      houseHoldID: "HH002",
      chuHo: "Nguyễn Văn Hộ",
      status: "Phê duyệt",
      classification: "Tạm vắng",
      dateOfBirth: "20/03/1985",
      gender: "Nam",
      personalId: "001234567891",
      address: "456 Đường DEF, Phường ABC, Quận 2, TP.HCM",
    },
    {
      role: "Kế toán",
      name: "Nguyễn Văn C",
      houseHoldID: "HH003",
      chuHo: "Nguyễn Văn Hộ",
      status: "Không phê duyệt",
      classification: "Tạm trú",
      dateOfBirth: "10/07/1992",
      gender: "Nữ",
      personalId: "001234567892",
      address: "789 Đường GHI, Phường DEF, Quận 3, TP.HCM",
    },
    {
      role: "Dân cư",
      name: "Nguyễn Văn D",
      houseHoldID: "HH004",
      chuHo: "Nguyễn Văn Công",
      status: "",
      classification: "Tạm vắng",
      dateOfBirth: "25/12/1988",
      gender: "Nam",
      personalId: "001234567893",
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

  // Lọc chỉ người chưa phê duyệt
  const handleFilterChuaDuyet = () => {
    setData((prev) => prev.filter((item) => item.status === ""));
  };

  // Tìm kiếm dựa trên data gốc
  const handleSearch = () => {
    let filtered = fullData;

    if (searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
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

  // Mở modal khi click vào '...'
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
      updateStatus(selectedIndex, newStatus);
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
          <h1 style={{ margin: 0 }}>Danh sách tạm trú tạm vắng</h1>

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
            Xác nhận phê duyệt
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
                  Trạng thái
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
                    <span style={{
                      background: item.classification === "Tạm trú" ? "#e3f2fd" : "#fff3e0",
                      color: item.classification === "Tạm trú" ? "#1565c0" : "#e65100",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}>
                      {item.classification}
                    </span>
                  </TableCell>
                  <TableCell sx={{ padding: "16px" }}>
                    <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      {/* Nút Phê duyệt */}
                      <button
                        onClick={() => updateStatus(index, "Phê duyệt")}
                        style={{
                          padding: "8px",
                          color: "#10b981",
                          backgroundColor: item.status === "Phê duyệt" ? "#a9f5c0" : "transparent",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (item.status !== "Phê duyệt") {
                            e.currentTarget.style.backgroundColor = "#f0fdf4";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.status !== "Phê duyệt") {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                        title="Phê duyệt"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>

                      {/* Nút Từ chối */}
                      <button
                        onClick={() => updateStatus(index, "Không phê duyệt")}
                        style={{
                          padding: "8px",
                          color: "#f97316",
                          backgroundColor: item.status === "Không phê duyệt" ? "#ffcb8a" : "transparent",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (item.status !== "Không phê duyệt") {
                            e.currentTarget.style.backgroundColor = "#fff7ed";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.status !== "Không phê duyệt") {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                        title="Từ chối"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      {/* Dấu ... - Mở modal */}
                      <button
                        onClick={() => handleOpenModal(item, index)}
                        style={{
                          padding: "8px",
                          color: "#3b82f6",
                          backgroundColor: "#eff6ff",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dbeafe";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#eff6ff";
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
        <TamTruVangForm
          open={openModal}
          onClose={handleCloseModal}
          person={selectedPerson}
          onApprove={() => handleStatusChange("Phê duyệt")}
          onReject={() => handleStatusChange("Không phê duyệt")}
        />
      </div>
    </MainLayout>
  );
}
