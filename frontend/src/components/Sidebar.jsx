import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  User,
  FileText,
  PlusCircle,
  History,
  CheckCircle,
  Repeat,
} from "lucide-react";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: "304px",
        height: "100vh",
        backgroundColor: "#1F2335",
        padding: "24px 20px",
        color: "#D4DBE5",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
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
        MY APP
      </Typography>

      {/* MENU */}
      <SectionTitle text="Menu" />
      <MenuItem icon={<Home size={18} />} label="Dashboard" />
      <MenuItem icon={<Users size={18} />} label="Quản lý hộ khẩu" />
      <MenuItem icon={<User size={18} />} label="Quản lý nhân khẩu" />

      {/* ACTION */}
      <SectionTitle text="Action" />
      <MenuItem
        icon={<FileText size={18} />}
        label="Danh sách cần phê duyệt"
        subItems={[
          "Danh sách đăng ký tài khoản",
          "Danh sách khai báo sinh tử",
          "Danh sách thu tiền",
          "Danh sách khai báo tạm trú/vắng",
        ]}
        links={["/dktk", "/kbst", "/thutien", "/tamtruvang"]}
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

function MenuItem({ icon, label, subItems = [], links = [] }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .submenu": {
          display: subItems.length ? "flex" : "none",
        },
      }}
    >
      {/* MAIN ITEM */}
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

      {/* SUB MENU */}
      {subItems.length > 0 && (
        <Box
          className="submenu"
          sx={{
            display: "none",
            position: "absolute",
            left: "100%",
            top: 0,
            flexDirection: "column",
            backgroundColor: "#2A2E42",
            padding: "6px 0",
            minWidth: "230px",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        >
          {subItems.map((text, idx) => (
            <Box
              key={idx}
              onClick={() => navigate(links[idx])}
              sx={{
                padding: "10px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#D4DBE5",
                "&:hover": {
                  backgroundColor: "#3A3F55",
                  color: "white",
                },
              }}
            >
              {text}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
