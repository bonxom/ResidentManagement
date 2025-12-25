import { useState } from "react";
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
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { 
  FamilyRestroom, 
  HomeWork, 
  AccountBalance,
  Visibility 
} from "@mui/icons-material";

/* ================== MOCK DATA ================== */

// Mock data cho lịch sử sinh tử
const mockBirthDeathHistory = [
  {
    id: "bd_001",
    time: "15/12/2024 08:30",
    type: "BIRTH_REPORT",
    status: "APPROVED",
    subjectName: "Nguyễn Văn Minh",
    birthDate: "10/12/2024",
    note: "Hồ sơ khai sinh đầy đủ",
  },
  {
    id: "bd_002", 
    time: "20/11/2024 14:20",
    type: "DEATH_REPORT",
    status: "APPROVED",
    subjectName: "Trần Thị Lan",
    deathDate: "18/11/2024",
    note: "Đã xác minh giấy chứng tử",
  },
  {
    id: "bd_003",
    time: "05/10/2024 09:15",
    type: "BIRTH_REPORT", 
    status: "REJECTED",
    subjectName: "Lê Văn Nam",
    birthDate: "01/10/2024",
    note: "Thiếu giấy khai sinh gốc",
  },
];

// Mock data cho lịch sử tạm trú/vắng
const mockResidenceHistory = [
  {
    id: "tr_001",
    time: "12/12/2024 10:30",
    type: "TEMPORARY_RESIDENCE",
    status: "APPROVED",
    subjectName: "Nguyễn Mạnh Tù",
    startDate: "01/01/2024",
    endDate: "31/12/2024",
    reason: "Làm việc tại địa phương",
    note: "Hồ sơ hợp lệ",
  },
  {
    id: "tr_002",
    time: "08/11/2024 15:45",
    type: "TEMPORARY_ABSENT",
    status: "APPROVED", 
    subjectName: "Trần Văn Hùng",
    startDate: "10/11/2024",
    endDate: "10/12/2024",
    reason: "Công tác xa",
    note: "Đã xác minh địa chỉ tạm trú",
  },
  {
    id: "tr_003",
    time: "25/10/2024 11:20",
    type: "TEMPORARY_RESIDENCE",
    status: "REJECTED",
    subjectName: "Phạm Thị Mai",
    startDate: "01/11/2024", 
    endDate: "01/05/2025",
    reason: "Học tập",
    note: "Thiếu giấy xác nhận từ trường học",
  },
];

// Mock data cho lịch sử khoản thu
const mockPaymentHistory = [
  {
    id: "pay_001",
    time: "18/12/2024 09:00",
    feeName: "Phí quản lý chung cư",
    amount: 500000,
    status: "APPROVED",
    paymentMethod: "Chuyển khoản",
    note: "Đã xác minh biên lai chuyển khoản",
  },
  {
    id: "pay_002",
    time: "15/11/2024 14:30",
    feeName: "Phí vệ sinh môi trường",
    amount: 200000,
    status: "APPROVED",
    paymentMethod: "Tiền mặt",
    note: "Nộp trực tiếp tại văn phòng",
  },
  {
    id: "pay_003",
    time: "10/10/2024 16:15",
    feeName: "Đóng góp từ thiện",
    amount: 1000000,
    status: "REJECTED",
    paymentMethod: "Chuyển khoản",
    note: "Số tiền chuyển khoản không khớp",
  },
];

/* ================== COMPONENTS ================== */

// Component hiển thị bảng sinh tử
function BirthDeathTable({ data }) {
  const ROWS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(data.length / ROWS_PER_PAGE) || 1;
  const visibleRows = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const getTypeLabel = (type) => {
    return type === "BIRTH_REPORT" ? "Khai sinh" : "Khai tử";
  };

  const getTypeColor = (type) => {
    return type === "BIRTH_REPORT" ? "success" : "error";
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "APPROVED": return "Đã duyệt";
      case "REJECTED": return "Từ chối";
      default: return "Chờ duyệt";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "warning";
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Thời gian</strong></TableCell>
              <TableCell><strong>Loại</strong></TableCell>
              <TableCell><strong>Đối tượng</strong></TableCell>
              <TableCell><strong>Ngày sinh/tử</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Ghi chú</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Chip 
                    label={getTypeLabel(row.type)}
                    color={getTypeColor(row.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.birthDate || row.deathDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(row.status)}
                    color={getStatusColor(row.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

// Component hiển thị bảng tạm trú/vắng
function ResidenceTable({ data }) {
  const ROWS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(data.length / ROWS_PER_PAGE) || 1;
  const visibleRows = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const getTypeLabel = (type) => {
    return type === "TEMPORARY_RESIDENCE" ? "Tạm trú" : "Tạm vắng";
  };

  const getTypeColor = (type) => {
    return type === "TEMPORARY_RESIDENCE" ? "primary" : "secondary";
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "APPROVED": return "Đã duyệt";
      case "REJECTED": return "Từ chối";
      default: return "Chờ duyệt";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "warning";
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Thời gian</strong></TableCell>
              <TableCell><strong>Loại</strong></TableCell>
              <TableCell><strong>Đối tượng</strong></TableCell>
              <TableCell><strong>Từ ngày</strong></TableCell>
              <TableCell><strong>Đến ngày</strong></TableCell>
              <TableCell><strong>Lý do</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Chip 
                    label={getTypeLabel(row.type)}
                    color={getTypeColor(row.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(row.status)}
                    color={getStatusColor(row.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

// Component hiển thị bảng khoản thu
function PaymentTable({ data }) {
  const ROWS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(data.length / ROWS_PER_PAGE) || 1;
  const visibleRows = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const getStatusLabel = (status) => {
    switch (status) {
      case "APPROVED": return "Đã duyệt";
      case "REJECTED": return "Từ chối";
      default: return "Chờ duyệt";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "warning";
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Thời gian</strong></TableCell>
              <TableCell><strong>Tên khoản thu</strong></TableCell>
              <TableCell><strong>Số tiền</strong></TableCell>
              <TableCell><strong>Phương thức</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Ghi chú</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.feeName}</TableCell>
                <TableCell>
                  <Typography fontWeight={500} color="primary">
                    {row.amount.toLocaleString()} VND
                  </Typography>
                </TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(row.status)}
                    color={getStatusColor(row.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

/* ================== MAIN PAGE ================== */

export default function Lichsupheduyet() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "birth-death",
      title: "Lịch sử phê duyệt sinh tử",
      description: "Xem lịch sử các yêu cầu khai sinh, khai tử đã được phê duyệt",
      icon: <FamilyRestroom sx={{ fontSize: 40 }} />,
      color: "#4caf50",
      data: mockBirthDeathHistory,
      component: BirthDeathTable,
    },
    {
      id: "residence",
      title: "Lịch sử phê duyệt tạm trú/vắng", 
      description: "Xem lịch sử các yêu cầu tạm trú, tạm vắng đã được phê duyệt",
      icon: <HomeWork sx={{ fontSize: 40 }} />,
      color: "#2196f3",
      data: mockResidenceHistory,
      component: ResidenceTable,
    },
    {
      id: "payment",
      title: "Lịch sử các khoản thu",
      description: "Xem lịch sử các khoản thu đã được phê duyệt",
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: "#ff9800",
      data: mockPaymentHistory,
      component: PaymentTable,
    },
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <Box sx={{ padding: "24px 32px" }}>
      <Typography sx={{ fontSize: 26, fontWeight: 600, mb: 3 }}>
        Lịch sử phê duyệt
      </Typography>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} md={4} key={section.id}>
            <Card 
              sx={{ 
                height: "100%",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
                border: activeSection === section.id ? `2px solid ${section.color}` : "1px solid #e0e0e0",
              }}
              onClick={() => handleSectionClick(section.id)}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: section.color, mb: 2 }}>
                  {section.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {section.description}
                </Typography>
                <Typography variant="body2" fontWeight={500} color={section.color}>
                  {section.data.length} bản ghi
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant={activeSection === section.id ? "contained" : "outlined"}
                  startIcon={<Visibility />}
                  sx={{ 
                    backgroundColor: activeSection === section.id ? section.color : "transparent",
                    borderColor: section.color,
                    color: activeSection === section.id ? "white" : section.color,
                    "&:hover": {
                      backgroundColor: section.color,
                      color: "white",
                    }
                  }}
                >
                  {activeSection === section.id ? "Đang xem" : "Xem chi tiết"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hiển thị bảng khi có section được chọn */}
      {activeSection && (
        <Box sx={{ mt: 4 }}>
          {sections.map((section) => {
            if (section.id === activeSection) {
              const TableComponent = section.component;
              return (
                <Box key={section.id}>
                  <Typography variant="h5" fontWeight={600} mb={3} color={section.color}>
                    {section.title}
                  </Typography>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <TableComponent data={section.data} />
                  </Paper>
                </Box>
              );
            }
            return null;
          })}
        </Box>
      )}
    </Box>
  );
}
