import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { Bell, User, Settings } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function Topbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        background: "linear-gradient(to right, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        borderBottom: "none",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Welcome message */}
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

      {/* Right: icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Notification Icon */}
        <IconButton
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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

        {/* Settings Icon */}
        <IconButton
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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
          <Settings size={20} />
        </IconButton>

        {/* USER ICON */}
        <IconButton
          onClick={() => navigate("/profile")}
          sx={{
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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
          <User size={20} />
        </IconButton>
      </Box>
    </Box>
  );
}
