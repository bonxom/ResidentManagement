import { Box, Typography } from "@mui/material";
import { Home, Users, User, FileText, PlusCircle, History, CheckCircle, Repeat, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const drawerWidth = 304;

export function Sidebar({ user }) {
  const appTitle = user?.ten ? `Xin chào, ${user.ten}` : "MY APP";
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const navigate = useNavigate();

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setExpandedMenu(null);
    }, 150);
    setHideTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setExpandedMenu("approval");
  };

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
      <MenuItemWithSubmenu 
        icon={<FileText size={18} />} 
        label="Danh sách cần phê duyệt"
        isExpanded={expandedMenu === "approval"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        submenu={[
          { label: "Danh sách đăng kí tài khoản", path: "/dktk" },
          { label: "Danh sách khai báo sinh tử", path: "/kbst" },
          { label: "Danh sách thu tiền", path: "/thutien" },
          { label: "Danh sách tạm trú tạm vắng", path: "/tamtruvang" },
        ]}
        onSubmenuClick={(path) => {
          navigate(path);
          setExpandedMenu(null);
        }}
      />
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

function MenuItemWithSubmenu({ icon, label, isExpanded, onMouseEnter, onMouseLeave, submenu, onSubmenuClick }) {
  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        position: "relative",
      }}
    >
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
        <Typography sx={{ fontSize: "14px", flex: 1 }}>{label}</Typography>
        <ChevronDown 
          size={16} 
          style={{
            transition: "transform 0.2s",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      {isExpanded && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "#2A2E42",
            border: "1px solid #3A3E52",
            borderRadius: "4px",
            zIndex: 1001,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            minWidth: "100%",
          }}
        >
          {submenu.map((item, idx) => (
            <Box
              key={idx}
              onClick={() => onSubmenuClick(item.path)}
              sx={{
                padding: "10px 12px",
                fontSize: "13px",
                color: "#D4DBE5",
                cursor: "pointer",
                transition: "0.2s",
                borderBottom: idx < submenu.length - 1 ? "1px solid #3A3E52" : "none",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#3A3E52",
                  paddingLeft: "16px",
                },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
