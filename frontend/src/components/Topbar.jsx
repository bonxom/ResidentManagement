import { Box, Popover, Typography, List, ListItem, ListItemText, Badge, Divider } from "@mui/material";
import { Menu, Bell, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Topbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Thông báo mẫu
  const notifications = [
    { id: 1, title: "Thông báo mới", message: "Bạn có một hóa đơn cần thanh toán", time: "5 phút trước" },
    { id: 2, title: "Nhắc nhở", message: "Hạn nộp phí quản lý tháng 11", time: "1 ngày trước" },
  ];

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = () => {
    navigate("/whoami");
  };

  const open = Boolean(anchorEl);

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
      <Menu size={22} color="#555" style={{ cursor: "pointer" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <Bell 
            size={20} 
            color="#555" 
            style={{ cursor: "pointer" }} 
            onClick={handleBellClick}
          />
        </Badge>
        
        <User 
          size={20} 
          color="#555" 
          style={{ cursor: "pointer" }} 
          onClick={handleUserClick}
        />
        <Settings size={20} color="#555" style={{ cursor: "pointer" }} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 350, maxHeight: 400 }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Thông báo
            </Typography>
          </Box>
          
          <List sx={{ p: 0 }}>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="Không có thông báo mới"
                  sx={{ textAlign: "center", color: "#999" }}
                />
              </ListItem>
            ) : (
              notifications.map((notif, index) => (
                <Box key={notif.id}>
                  <ListItem 
                    sx={{ 
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f5f5" }
                    }}
                  >
                    <ListItemText
                      primary={notif.title}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {notif.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {notif.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </Box>
              ))
            )}
          </List>
        </Box>
      </Popover>
    </Box>
  );
}