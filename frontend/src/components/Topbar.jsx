import { Box, IconButton, Typography } from "@mui/material";
import { Bell, User, Settings } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useRoleNavigation } from "../hooks/useRoleNavigation";
import { useState } from "react";
import NotificationPanel from "./In4ButtonTop3/NotificationPanel"; // Đảm bảo đúng đường dẫn file

export default function Topbar() {
  const { navigateWithRole } = useRoleNavigation();
  const { user, checkAuth } = useAuthStore();

  const handleProfileClick = async () => {
    // Refresh user data before navigating to profile
    try {
      await checkAuth();
    } catch (error) {
      console.error("Failed to refresh profile", error);
    }
    navigateWithRole("/profile");
  };

  // Logic mở thông báo
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNoti = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNoti = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        background:
          "linear-gradient(to right, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "0.3px",
          }}
        >
          {user?.ten ? `Xin chào, ${user.ten}` : "8xRES"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Nút Chuông */}
        <IconButton
          onClick={handleOpenNoti}
          sx={{
            color: anchorEl ? "#2563eb" : "#4b5563",
            backgroundColor: anchorEl
              ? "rgba(37, 99, 235, 0.1)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            padding: "10px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Bell size={20} />
        </IconButton>

        {/* Khung thông báo tách riêng */}
        <NotificationPanel
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseNoti}
        />

        <IconButton
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
            },
          }}
        >
          <Settings size={20} />
        </IconButton>

        <IconButton
          onClick={handleProfileClick}
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
            },
          }}
        >
          <User size={20} />
        </IconButton>
      </Box>
    </Box>
  );
}
