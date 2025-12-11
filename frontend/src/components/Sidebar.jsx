import { Box, Typography } from "@mui/material";
import { Home, Users, User, FileText, PlusCircle, History, CheckCircle, Repeat } from "lucide-react";

export const drawerWidth = 304;

export function Sidebar({ user }) {
  const appTitle = user?.ten ? `Xin chào, ${user.ten}` : "MY APP";

  return (
      <Box
        sx={{
          width: `${drawerWidth}px`,
          height: "100vh",
          backgroundColor: "#1F2335",
          padding: "24px 20px",
          color: "#D4DBE5",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          position: "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
          zIndex: 1000,
        }}
      >


      {/* Title */}
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          mb: 4,
          mt: 4,
        }}
      >
        {appTitle}
      </Typography>

      {/* MENU */}
      <SectionTitle text="Menu" />
      <MenuItem icon={<Home size={18} />} label="Dashboard" />
      <MenuItem icon={<Users size={18} />} label="Quản lý hộ khẩu" />
      <MenuItem icon={<User size={18} />} label="Quản lý nhân khẩu" />

      {/* ACTION */}
      <SectionTitle text="Action" />
      <MenuItem icon={<FileText size={18} />} label="Danh sách cần phê duyệt" />
      <MenuItem icon={<PlusCircle size={18} />} label="Thêm thông tin cư dân" />

      {/* HISTORY */}
      <SectionTitle text="History" />
      <MenuItem icon={<History size={18} />} label="Lịch sử giao dịch" />
      <MenuItem icon={<CheckCircle size={18} />} label="Lịch sử phê duyệt" />
      <MenuItem icon={<Repeat size={18} />} label="Lịch sử thay đổi" />

    </Box>
  );
}

function SectionTitle({ text }) {
  return (
    <Typography
      sx={{
        fontSize: "12px",
        fontWeight: 600,
        color: "#A0A8B0",
        mt: 1,
        mb: "-4px",
      }}
    >
      {text}
    </Typography>
  );
}

function MenuItem({ icon, label }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          color: "white",
          backgroundColor: "#2A2E42",
        },
      }}
    >
      {icon}
      <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
    </Box>
  );
}

export default Sidebar;
