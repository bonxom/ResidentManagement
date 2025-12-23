import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { Home, Users, FileText, CheckCircle } from "lucide-react";
// import useAuthStore from "../store/authStore";
import useAuthStore from "../../store/authStore";

function AccountantDashboard() {
  const { user } = useAuthStore();

  // Lấy giờ hiện tại để chào phù hợp
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  // Các thống kê nhanh (có thể thay bằng data thật từ API)
  const quickStats = [
    {
      icon: <Home size={32} />,
      label: "Hộ gia đình",
      value: "1",
      color: "#2563eb",
    },
    {
      icon: <Users size={32} />,
      label: "Thành viên",
      value: "4",
      color: "#16a34a",
    },
    {
      icon: <FileText size={32} />,
      label: "Yêu cầu đang chờ",
      value: "2",
      color: "#ea580c",
    },
    {
      icon: <CheckCircle size={32} />,
      label: "Yêu cầu đã duyệt",
      value: "5",
      color: "#7c3aed",
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header chào mừng */}
      <Box
        sx={{
          mb: 4,
          p: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          color: "white",
          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "24px", md: "28px" },
            fontWeight: 300,
            mb: 1,
            opacity: 0.9,
          }}
        >
          {getGreeting()},
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "32px", sm: "40px", md: "48px" },
            fontWeight: 700,
            mb: 2,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {user?.name || "Người dùng"}!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            opacity: 0.95,
            maxWidth: "600px",
          }}
        >
          Chào mừng bạn quay trở lại với hệ thống quản lý dân cư. Chúc bạn có
          một ngày làm việc hiệu quả và tràn đầy năng lượng! 🌟
        </Typography>
      </Box>

      {/* Thống kê nhanh */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: stat.color,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Thông tin cá nhân */}
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            Thông tin cá nhân
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: "40px",
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar>

            {/* Thông tin chi tiết */}
            <Box sx={{ flex: 1, minWidth: "280px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#64748b",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      HỌ TÊN
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {user?.name || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#64748b",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      EMAIL
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {user?.email || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#64748b",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      SỐ ĐIỆN THOẠI
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {user?.phoneNumber || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#64748b",
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      NỞI Ở
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      {user?.location || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <CheckCircle size={18} />
                    {user?.role?.role_name || "Chưa xác định"}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountantDashboard;
