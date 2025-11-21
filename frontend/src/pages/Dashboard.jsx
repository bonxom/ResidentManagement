import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Divider, Toolbar, Drawer, List, ListItem, ListItemText, Box, Typography, Button, Card, CardContent, Avatar, ListItemButton } from '@mui/material';


function Dashboard() {
  const navigate = useNavigate();
  // Lấy user và hàm signOut từ store
  const { user, signOut } = useAuthStore(); 

  const drawerWidth = 240;

  // Nếu không có user (lỗi gì đó), quay về login
  if (!user) {
    navigate('/signin');
    return null; 
  }

  // Lấy tên vai trò (đã sửa ở backend để chống lỗi hoa/thường)
  const userRole = user.role?.role_name || 'Không có vai trò';

  // Kiểm tra có phải Hamlet Leader không
  // (Chúng ta đã sửa middleware nên 'HAMLET LEADER' hay 'Hamlet Leader' đều đúng)
  const isHamletLeader = userRole.toUpperCase() === 'HAMLET LEADER';

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const menuItems = [
    { text: 'Quản lý nhân khẩu', path: '/nhankhau' },
    { text: 'Quản lý hộ khẩu', path: '/hokhau' },
    { text: 'Quản lý thu chi', path: '/thuchi' },
    { text: 'Danh sách người cần phê duyệt', path: '/pheduyet'},
  ];

   return (
    <Box sx={{ display: "flex" }}>
      
      {/* ==== SIDEBAR ==== */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: "border-box" }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Button 
            variant="text"
            onClick={handleLogout}
            color="error">
              Đăng xuất
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* ==== MAIN CONTENT ==== */}
      <Box sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        
        <Typography variant="h4" gutterBottom>
          Chào mừng trở lại, {user.ten}!
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Thông tin cá nhân</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Avatar sx={{ mr: 2, width: 56, height: 56 }}>
                {user.ten ? user.ten.charAt(0).toUpperCase() : 'U'}
              </Avatar>

              <Box>
                <Typography><strong>Họ tên:</strong> {user.ten}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Số điện thoại:</strong> {user.soDienThoai || 'Chưa cập nhật'}</Typography>
                <Typography><strong>Nơi ở:</strong> {user.noiO || 'Chưa cập nhật'}</Typography>
                <Typography><strong>Vai trò:</strong> {user.role.role_name}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

      </Box>

    </Box>
  );
}

export default Dashboard;
