import React from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import useAuthStore from '../store/authStore';

function Dashboard() {
  const { user } = useAuthStore();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng trở lại, {user?.name}!
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Thông tin cá nhân</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar sx={{ mr: 2, width: 56, height: 56 }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>

            <Box>
              <Typography><strong>Họ tên:</strong> {user?.name}</Typography>
              <Typography><strong>Email:</strong> {user?.email}</Typography>
              <Typography><strong>Số điện thoại:</strong> {user?.phoneNumber || 'Chưa cập nhật'}</Typography>
              <Typography><strong>Nơi ở:</strong> {user?.location || 'Chưa cập nhật'}</Typography>
              <Typography><strong>Vai trò:</strong> {user?.role?.role_name}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;