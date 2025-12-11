import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu as MuiMenu, MenuItem } from "@mui/material";
import { Bell, User, Settings } from "lucide-react";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",   // căn phải
        px: 3,
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Right: icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Bell size={20} color="#555" style={{ cursor: "pointer" }} />

        {/* USER ICON + MENU */}
        <IconButton onClick={handleOpenUserMenu}>
          <User size={20} color="#555" />
        </IconButton>

        <MuiMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 150,
              borderRadius: 2,
            },
          }}
        >

          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              navigate("/signin");
            }}
            sx={{ color: "red" }}
          >
            Đăng xuất
          </MenuItem>
        </MuiMenu>

        <Settings size={20} color="#555" style={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
}
