// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   Container,
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Avatar,
//   Grid,
//   Divider,
// } from '@mui/material'
// import {
//   LogOut,
//   User,
//   CreditCard,
//   Phone,
//   MapPin,
//   Home as HomeIcon,
// } from 'lucide-react'
// import useAuthStore from '../store/authStore'
// import RoleBadge from '../components/RoleBadge'
// import RequirePermission from '../components/RequirePermission'
// import { PERMISSIONS } from '../constants/roles'

// function Dashboard() {
//   const navigate = useNavigate()
//   const { user, signOut, loadUserFromStorage } = useAuthStore()

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     const userData = localStorage.getItem('user')

//     if (token && userData) {
//       loadUserFromStorage()
//     } else {
//       navigate('/signin')
//     }
//   }, [navigate, loadUserFromStorage])

//   const handleSignOut = () => {
//     signOut()
//     navigate('/signin')
//   }

//   if (!user) {
//     return (
//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Typography variant="h6" color="text.secondary">
//           Đang tải thông tin người dùng...
//         </Typography>
//       </Box>
//     )
//   }

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ minHeight: '100vh', py: 4 }}>
//         {/* Header Card - Thông tin người dùng */}
//         <Card sx={{ boxShadow: 3, mb: 3 }}>
//           <CardContent sx={{ p: 4 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 flexWrap: 'wrap',
//                 gap: 2,
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <Avatar
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     bgcolor: 'primary.main',
//                   }}
//                 >
//                   <User size={40} />
//                 </Avatar>

//                 <Box>
//                   <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     {user?.fullName || 'Người dùng'}
//                   </Typography>
//                   <RoleBadge role={user?.role} />
//                 </Box>
//               </Box>

//               <Button
//                 variant="contained"
//                 color="error"
//                 startIcon={<LogOut size={20} />}
//                 onClick={handleSignOut}
//               >
//                 Đăng Xuất
//               </Button>
//             </Box>

//             <Divider sx={{ my: 3 }} />

//             {/* Thông tin cá nhân */}
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   <CreditCard size={20} color="#666" />
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Số căn cước
//                     </Typography>
//                     <Typography variant="body1" fontWeight="600">
//                       {user?.citizenId || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   <Phone size={20} color="#666" />
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Số điện thoại
//                     </Typography>
//                     <Typography variant="body1" fontWeight="600">
//                       {user?.phoneNumber || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   <MapPin size={20} color="#666" />
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Địa chỉ
//                     </Typography>
//                     <Typography variant="body1" fontWeight="600">
//                       {user?.address || 'Chưa cập nhật'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   <HomeIcon size={20} color="#666" />
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Mã hộ gia đình
//                     </Typography>
//                     <Typography variant="body1" fontWeight="600">
//                       {user?.householdBookId || 'Chưa có'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//       </Box>
//     </Container>
//   )
// }

// export default Dashboard

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