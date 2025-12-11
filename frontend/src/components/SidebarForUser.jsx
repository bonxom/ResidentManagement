import { Box, Typography } from "@mui/material";
import { Home, Users, User, FileText, PlusCircle, History, CheckCircle, Repeat, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const drawerWidth = 304;

export function SidebarForUser({ user }) {
  const navigate = useNavigate();
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
      <MenuItem icon={<Home size={18} />} label="Dashboard" to="/mainuser" />
      <MenuItem icon={<Users size={18} />} label="Thông tin thành viên" to="/userinfo" />
      <MenuItem icon={<Wallet size={18} />} label="Các khoản nộp" to="/feeuser" />

      {/* HISTORY */}
      <SectionTitle text="History" />
      <MenuItem icon={<History size={18} />} label="Lịch sử giao dịch" to="/lichsu/giaodich" />
      <MenuItem icon={<CheckCircle size={18} />} label="Lịch sử phê duyệt" to="/lichsu/pheduyet" />
      <MenuItem icon={<Repeat size={18} />} label="Lịch sử thay đổi" to="/lichsu/thaydoi" />

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

function MenuItem({ icon, label, to }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(to)}
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

export default SidebarForUser;
