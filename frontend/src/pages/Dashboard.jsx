import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  // Lấy user và hàm signOut từ store
  const { user, signOut } = useAuthStore(); 

  // Nếu không có user (lỗi gì đó), quay về login
  if (!user) {
    navigate('/signin');
    return null; 
  }

  // Lấy tên vai trò (đã sửa ở backend để chống lỗi hoa/thường)
  const userRole = user.role?.role_name || 'Không có vai trò';

  // Kiểm tra có phải Tổ trưởng không
  // (Chúng ta đã sửa middleware nên 'TỔ TRƯỞNG' hay 'Tổ trưởng' đều đúng)
  const isToTruong = userRole.toUpperCase() === 'TỔ TRƯỞNG';

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng trở lại, {user.ten}!
      </Typography>
      
      <Button 
        variant="contained" 
        color="error" 
        onClick={handleLogout} 
        sx={{ mb: 3 }}
      >
        Đăng xuất
      </Button>

      {/* Box hiển thị thông tin cá nhân (cho mọi role) */}
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

      {/* === NÚT ĐIỀU KIỆN CHO TỔ TRƯỞNG === */}
      {isToTruong && (
        <Card>
          <CardContent>
            <Typography variant="h6">Chức năng Quản lý</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Bạn là Tổ trưởng, bạn có các quyền quản lý.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/quan-ly-dan-cu')} // (Giả sử bạn có route này)
            >
              Xem tất cả dân cư
            </Button>
          </CardContent>
        </Card>
      )}

    </Box>
  );
}

export default Dashboard;