import { Box } from "@mui/material";
import { Menu, Bell, User, Settings } from "lucide-react";

export default function Topbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: menu icon */}
      <Menu size={22} color="#555" style={{ cursor: "pointer" }} />

      {/* Right: icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Bell size={20} color="#555" style={{ cursor: "pointer" }} />
        <User size={20} color="#555" style={{ cursor: "pointer" }} />
        <Settings size={20} color="#555" style={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
}
