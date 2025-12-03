import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import {
  Home,
  Users,
  User,
  FileText,
  PlusCircle,
  History,
  CheckCircle,
  Repeat
} from "lucide-react";

export const drawerWidth = 300;

const menuGroups = [
  {
    title: "Menu",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
      { label: "Quản lý hộ khẩu", path: "/hokhau", icon: <Users size={18} /> },
      { label: "Quản lý nhân khẩu", path: "/nhankhau", icon: <User size={18} /> },
    ],
  },
  {
    title: "Action",
    items: [
      { label: "Danh sách cần phê duyệt", path: "/pheduyet", icon: <FileText size={18} /> },
      { label: "Thêm thông tin cư dân", path: "/them-cu-dan", icon: <PlusCircle size={18} /> },
    ],
  },
  {
    title: "History",
    items: [
      { label: "Lịch sử giao dịch", path: "/ls-giao-dich", icon: <History size={18} /> },
      { label: "Lịch sử phê duyệt", path: "/ls-phe-duyet", icon: <CheckCircle size={18} /> },
      { label: "Lịch sử thay đổi", path: "/ls-thay-doi", icon: <Repeat size={18} /> },
    ],
  },
];

export function Sidebar({ user, navigate, onLogout }) {
  const appTitle = user?.ten ? `Xin chào, ${user.ten}` : "App quản lý cư dân";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1F2335",
          color: "#D4DBE5",
        },
      }}
    >
      {/* Title area */}
      <Box
        sx={{
          padding: "24px 20px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: 700,
            color: "white",
            mt: 2,
          }}
        >
          {appTitle}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#2A2E42" }} />

      {/* Menu list */}
      <Box sx={{ overflowY: "auto", mt: 2, px: 2 }}>
        {menuGroups.map((group, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            {/* Section title */}
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#A0A8B0",
                mb: "6px",
                mt: 1,
              }}
            >
              {group.title}
            </Typography>

            {group.items.map((item, idx) => (
              <MenuItem
                key={idx}
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.path)}
              />
            ))}
          </Box>
        ))}

        <Divider sx={{ borderColor: "#2A2E42", mt: 2 }} />

        {/* Logout */}
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="text"
            color="error"
            sx={{
              textTransform: "none",
              justifyContent: "flex-start",
              pl: 1,
            }}
            onClick={onLogout}
          >
            Đăng xuất
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: "8px",
          p: "10px",
          gap: "10px",
          color: "#D4DBE5",
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "#2A2E42",
            color: "white",
          },
        }}
      >
        {icon}
        <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
      </ListItemButton>
    </ListItem>
  );
}
