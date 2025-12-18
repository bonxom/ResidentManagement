import { Box, Typography, IconButton } from "@mui/material";
import { Home, Users, User, FileText, PlusCircle, History, CheckCircle, Repeat, Wallet, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../feature/admin/LogoutButton";

export const drawerWidthExpanded = 304;
export const drawerWidthCollapsed = 80;
export const drawerWidth = drawerWidthExpanded; // For backward compatibility

export function SidebarForUser({ user, onWidthChange }) {
  const navigate = useNavigate();
  const appTitle = user?.ten ? `Xin chào, ${user.ten}` : "DÂN CƯ SỐ";
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentDrawerWidth = isExpanded ? drawerWidthExpanded : drawerWidthCollapsed;

  // Notify parent of width changes
  React.useEffect(() => {
    if (onWidthChange) {
      onWidthChange(currentDrawerWidth);
    }
  }, [currentDrawerWidth, onWidthChange]);

  return (
    <Box
      sx={{
        width: `${currentDrawerWidth}px`,
        height: "100vh",
        backgroundColor: "#1F2335",
        padding: isExpanded ? "24px 20px" : "24px 12px",
        color: "#D4DBE5",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 1000,
        transition: "width 0.3s ease, padding 0.3s ease",
      }}
    >

      {/* Toggle Button */}
      <Box sx={{ display: "flex", justifyContent: isExpanded ? "flex-end" : "center", mb: 2 }}>
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "#2A2E42" }
          }}
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </IconButton>
      </Box>

      {/* Title */}
      {isExpanded && (
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            mb: 4,
            mt: 2,
          }}
        >
          {appTitle}
        </Typography>
      )}

      {/* MENU */}
      {isExpanded && <SectionTitle text="Menu" />}
      <MenuItem icon={<Home size={18} />} label="Dashboard" to="/mainuser" isExpanded={isExpanded} />
      <MenuItem icon={<Users size={18} />} label="Thông tin thành viên" to="/thongtinhodan" isExpanded={isExpanded} />
      <MenuItem icon={<Wallet size={18} />} label="Các khoản nộp" to="/feeuser" isExpanded={isExpanded} />

      {/* HISTORY */}
      {isExpanded && <SectionTitle text="History" />}
      <MenuItem icon={<History size={18} />} label="Lịch sử giao dịch" to="/lichsu/giaodich" isExpanded={isExpanded} />
      <MenuItem icon={<CheckCircle size={18} />} label="Lịch sử phê duyệt" to="/lichsu/pheduyet" isExpanded={isExpanded} />
      <MenuItem icon={<Repeat size={18} />} label="Lịch sử thay đổi" to="/lichsu/thaydoi" isExpanded={isExpanded} />

      {/* Logout Button */}
      <LogoutButton isExpanded={isExpanded} />

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

function MenuItem({ icon, label, to, isExpanded }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => to && navigate(to)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isExpanded ? "flex-start" : "center",
        gap: "10px",
        padding: "10px",
        cursor: "pointer",
        transition: "0.2s",
        borderRadius: "8px",
        "&:hover": {
          color: "white",
          backgroundColor: "#2A2E42",
        },
      }}
      title={!isExpanded ? label : ""}
    >
      {icon}
      {isExpanded && <Typography sx={{ fontSize: "14px" }}>{label}</Typography>}
    </Box>
  );
}

export default SidebarForUser;

