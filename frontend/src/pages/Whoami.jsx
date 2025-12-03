import { Box, Typography, Card, CardContent, Avatar, Grid, Paper, Divider, Chip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { userAPI } from '../services/apiService';
import { Sidebar, drawerWidth } from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

function Whoami() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    navigate('/signin');
    return null;
  }

  // Gọi API để lấy thông tin chi tiết người dùng
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        // Gọi API getProfile để lấy thông tin cá nhân
        const data = await userAPI.getProfile();
        setUserDetails(data);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        setError(err.message);
        // Nếu API lỗi, dùng thông tin từ store
        setUserDetails(user);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  // Hiển thị loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Topbar />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar user={user} navigate={navigate} onLogout={handleLogout} />
          <Box
            sx={{
              flexGrow: 1,
              ml: `${drawerWidth - 150}px`,
              backgroundColor: '#F5F6FA',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }


  const displayUser = userDetails || user;

  // Định dạng ngày sinh
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Thông tin người dùng
  const userInfo = [
    { 
      icon: <User size={20} />, 
      label: 'Họ và tên', 
      value: displayUser.name || displayUser.ten || 'Chưa cập nhật' 
    },
    { 
      icon: <Mail size={20} />, 
      label: 'Email', 
      value: displayUser.email || 'Chưa cập nhật' 
    },
    { 
      icon: <Phone size={20} />, 
      label: 'Số điện thoại', 
      value: displayUser.phoneNumber || displayUser.soDienThoai || 'Chưa cập nhật' 
    },
    { 
      icon: <CreditCard size={20} />, 
      label: 'CCCD', 
      value: displayUser.userCardID || 'Chưa cập nhật' 
    },
    { 
      icon: <MapPin size={20} />, 
      label: 'Địa chỉ', 
      value: displayUser.location || displayUser.noiO || 'Chưa cập nhật' 
    },
    { 
      icon: <Calendar size={20} />, 
      label: 'Ngày sinh', 
      value: formatDate(displayUser.dob || displayUser.ngaySinh) 
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Topbar />

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar user={user} navigate={navigate} onLogout={handleLogout} />

        <Box
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth - 150}px`,
            backgroundColor: '#F5F6FA',
            minHeight: '100vh',
            p: 4,
            mt: 2
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Thông tin cá nhân
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    fontSize: '2.5rem',
                    bgcolor: 'white',
                    color: '#667eea',
                    fontWeight: 600
                  }}
                >
                  {(displayUser.name || displayUser.ten || 'U').charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {displayUser.name || displayUser.ten || 'Người dùng'}
                </Typography>
                
                <Chip 
                  icon={<Shield size={16} />}
                  label={displayUser.role?.role_name || 'Thành viên'}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Paper>
            </Grid>

            {/* Card chi tiết thông tin */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Chi tiết thông tin
                </Typography>

                <Grid container spacing={2}>
                  {userInfo.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 1,
                          bgcolor: '#f8f9fa',
                          '&:hover': {
                            bgcolor: '#e9ecef'
                          },
                          transition: 'all 0.2s'
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: 'white',
                            mr: 2,
                            color: '#667eea'
                          }}
                        >
                          {item.icon}
                        </Box>
                        
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'text.secondary',
                              fontWeight: 500,
                              display: 'block'
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ fontWeight: 500 }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

          
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Whoami;