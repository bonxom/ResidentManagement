import { Box, IconButton, Typography } from "@mui/material";
import { Bell, User, Settings, ArrowLeft, ChevronLeft} from "lucide-react";
import useAuthStore from "../store/authStore";
import { useRoleNavigation } from "../hooks/useRoleNavigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "./In4ButtonTop3/NotificationPanel"; // Đảm bảo đúng đường dẫn file
import useNotificationStore from "../store/notificationStore";
import ChatButton from "./Chat/ChatButton";

export default function Topbar() {
  const { navigateWithRole } = useRoleNavigation();
  const { user, checkAuth } = useAuthStore();
  const { enabled: notificationsEnabled } = useNotificationStore();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProfileClick = async () => {
    // Refresh user data before navigating to profile
    try {
      await checkAuth();
    } catch (error) {
      console.error("Failed to refresh profile", error);
    }
    navigateWithRole("/profile");
  };

  // Navigate sang Setting
  const handleSettingClick = async () => {
    try {
      await checkAuth();
    } catch (error) {
      console.error("Failed to refresh settings data", error);
    }
    navigateWithRole("/setting");
  };

  // Logic mở thông báo
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNoti = (event) => {
    if (!notificationsEnabled) return; // đã tắt thông báo -> không mở panel
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
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            padding: "10px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
              transform: "translateX(-2px)",
            },
          }}
        >
          <ArrowLeft size={20} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

        {/* Nút Chuông */}
                <IconButton
          onClick={handleOpenNoti}
          sx={{
            color: !notificationsEnabled
              ? "#9ca3af"
              : anchorEl
              ? "#2563eb"
              : "#4b5563",
            backgroundColor: !notificationsEnabled
              ? "rgba(229, 231, 235, 0.7)"
              : anchorEl
              ? "rgba(37, 99, 235, 0.1)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            padding: "10px",
            transition: "all 0.3s ease",
            cursor: !notificationsEnabled ? "not-allowed" : "pointer",
            "&:hover": notificationsEnabled
              ? {
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                  color: "#2563eb",
                  transform: "translateY(-2px)",
                }
              : {},
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
          onClick={handleSettingClick}
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
