import React from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Sidebar, drawerWidth } from '../components/Sidebar';

function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar user={user} navigate={navigate} onLogout={handleLogout} />

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