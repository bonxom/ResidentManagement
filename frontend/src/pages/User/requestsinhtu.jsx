import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

import FormKhaiBaoSinh from "./form_in4/FormKhaiBaoSinh";
import FormKhaiBaoTu from "./form_in4/FormKhaiBaoTu";

/* ================== DIALOG CHỌN LOẠI ================== */
function ChonLoaiKhaiBaoDialog({ open, onClose, onSelect }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle align="center">Chọn loại khai báo</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 3, py: 4 }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => onSelect("Sinh")}
        >
          KHAI BÁO SINH
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onSelect("Tử")}
        >
          KHAI BÁO TỬ
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function RequestSinhTu() {
  const [openSelect, setOpenSelect] = useState(false);
  const [openSinhForm, setOpenSinhForm] = useState(false);
  const [openTuForm, setOpenTuForm] = useState(false);

  const [pendingList, setPendingList] = useState([]);
  const [data, setData] = useState([]);

  const handleSelectType = (type) => {
    setOpenSelect(false);
    type === "Sinh" ? setOpenSinhForm(true) : setOpenTuForm(true);
  };

  /* nhận dữ liệu từ form */
  const handleAddRequest = (item) => {
    setPendingList((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        status: "Chưa duyệt",
      },
    ]);
  };

  /* cập nhật bảng */
  const handleUpdate = () => {
    setData((prev) => [...prev, ...pendingList]);
    setPendingList([]);
  };

  const renderStatus = (status) => {
    if (status === "Đã duyệt") return <Chip label="Đã duyệt" color="success" />;
    if (status === "Từ chối") return <Chip label="Từ chối" color="error" />;
    return <Chip label="Chưa duyệt" color="warning" />;
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
          Khai báo sinh tử
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenSelect(true)}>
            Khai báo
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Box>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vai trò</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Mã hộ</TableCell>
              <TableCell>Chủ hộ</TableCell>
              <TableCell>Phân loại</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Chưa có khai báo nào
                </TableCell>
              </TableRow>
            )}

            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.houseHoldID}</TableCell>
                <TableCell>{item.chuHo}</TableCell>
                <TableCell>
                  <Chip
                    label={item.type}
                    color={item.type === "Sinh" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>{renderStatus(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* dialogs */}
      <ChonLoaiKhaiBaoDialog
        open={openSelect}
        onClose={() => setOpenSelect(false)}
        onSelect={handleSelectType}
      />

      <FormKhaiBaoSinh
        open={openSinhForm}
        onClose={() => setOpenSinhForm(false)}
        onSubmit={handleAddRequest}
      />

      <FormKhaiBaoTu
        open={openTuForm}
        onClose={() => setOpenTuForm(false)}
        onSubmit={handleAddRequest}
      />
    </Box>
  );
}
