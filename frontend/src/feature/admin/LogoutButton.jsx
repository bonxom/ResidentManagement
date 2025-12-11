import { Box, Typography } from "@mui/material";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function LogoutButton({ isExpanded = true }) {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      signOut();
      navigate("/signin");
    }
  };

  return (
    <Box
      onClick={handleLogout}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isExpanded ? "flex-start" : "center",
        gap: "10px",
        padding: "12px",
        cursor: "pointer",
        transition: "0.2s",
        backgroundColor: "#2A2E42",
        borderRadius: "8px",
        mt: "auto",
        mb: 2,
        "&:hover": {
          color: "white",
          backgroundColor: "#d32f2f",
        },
      }}
      title={!isExpanded ? "Đăng xuất" : ""}
    >
      <LogOut size={18} />
      {isExpanded && <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>Đăng xuất</Typography>}
    </Box>
  );
}
