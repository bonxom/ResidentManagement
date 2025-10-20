import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
} from '@mui/material'
import { LogOut, User, CreditCard, Phone, MapPin, Home as HomeIcon, Crown, Calculator, DollarSign } from 'lucide-react'
import useAuthStore from '../store/authStore'
import RoleBadge from '../components/RoleBadge'
import RequirePermission from '../components/RequirePermission'
import { PERMISSIONS } from '../constants/roles'

function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '100vh', py: 4 }}>
        {/* Header Card - Thông tin người dùng */}
        <Card sx={{ boxShadow: 3, mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                  }}
                >
                  <User size={40} />
                </Avatar>
                
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {user?.fullName || 'Người dùng'}
                  </Typography>
                  <RoleBadge role={user?.role} />
                </Box>
              </Box>

              <Button
                variant="contained"
                color="error"
                startIcon={<LogOut size={20} />}
                onClick={handleSignOut}
              >
                Đăng Xuất
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Thông tin cá nhân */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CreditCard size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Số căn cước
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {user?.citizenId || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Số điện thoại
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {user?.phoneNumber || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Địa chỉ
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {user?.address || 'Chưa cập nhật'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <HomeIcon size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Mã hộ gia đình
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {user?.householdId || 'Chưa có'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Chức năng chính */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Chức năng chính
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Tổ Dân Phố - Full quyền */}
          <RequirePermission permission={PERMISSIONS.MANAGE_USERS}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', bgcolor: 'error.50', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Crown size={28} color="#d32f2f" />
                    <Typography variant="h6" color="error" fontWeight="bold">
                      Quản lý toàn bộ
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Quản lý người dùng, phân quyền, cài đặt hệ thống và toàn bộ dân phố
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>

          {/* Kiểm Toán - Quản lý tài chính */}
          <RequirePermission permission={PERMISSIONS.AUDIT_FINANCE}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', bgcolor: 'warning.50', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Calculator size={28} color="#ed6c02" />
                    <Typography variant="h6" color="warning.main" fontWeight="bold">
                      Kiểm toán tài chính
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Quản lý các khoản thu chi, kiểm toán sổ sách tài chính của dân phố
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>

          {/* Chủ Hộ - Quản lý hộ gia đình */}
          <RequirePermission permission={PERMISSIONS.MANAGE_HOUSEHOLD_MEMBERS}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', bgcolor: 'info.50', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <HomeIcon size={28} color="#0288d1" />
                    <Typography variant="h6" color="info.main" fontWeight="bold">
                      Quản lý hộ gia đình
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Quản lý thông tin các thành viên trong hộ và các khoản đóng góp
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>

          {/* Xem thông tin cá nhân - Tất cả */}
          <RequirePermission permission={PERMISSIONS.VIEW_OWN_INFO}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <User size={28} color="#1976d2" />
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      Thông tin của tôi
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Xem và cập nhật thông tin cá nhân của bạn
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>

          {/* Xem thông báo - Tất cả */}
          <RequirePermission permission={PERMISSIONS.VIEW_ANNOUNCEMENTS}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Typography variant="h4">📢</Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      Thông báo
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Xem các thông báo và tin tức từ tổ dân phố
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>

          {/* Đóng góp - Chủ hộ và Cư dân */}
          <RequirePermission permission={PERMISSIONS.VIEW_CONTRIBUTIONS}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <DollarSign size={28} color="#1976d2" />
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      Khoản đóng góp
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Xem và thanh toán các khoản đóng góp của hộ gia đình
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </RequirePermission>
        </Grid>

        {/* Thông tin quyền hạn */}
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              🔐 Quyền hạn của bạn
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <RequirePermission permission={PERMISSIONS.VIEW_ALL_CITIZENS}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2" color="primary" fontWeight="600">
                      ✓ Xem tất cả cư dân
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.MANAGE_HOUSEHOLD_MEMBERS}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2" color="info.main" fontWeight="600">
                      ✓ Quản lý thành viên hộ
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.AUDIT_FINANCE}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
                    <Typography variant="body2" color="warning.main" fontWeight="600">
                      ✓ Kiểm toán tài chính
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.VIEW_ALL_FINANCES}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2" color="primary" fontWeight="600">
                      ✓ Xem tất cả tài chính
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.CREATE_ANNOUNCEMENT}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2" color="primary" fontWeight="600">
                      ✓ Tạo thông báo
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.PAY_CONTRIBUTION}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2" color="success.main" fontWeight="600">
                      ✓ Thanh toán đóng góp
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.MANAGE_ROLES}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'error.50' }}>
                    <Typography variant="body2" color="error" fontWeight="600">
                      ✓ Quản lý phân quyền
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>

              <RequirePermission permission={PERMISSIONS.SYSTEM_SETTINGS}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'error.50' }}>
                    <Typography variant="body2" color="error" fontWeight="600">
                      ✓ Cài đặt hệ thống
                    </Typography>
                  </Paper>
                </Grid>
              </RequirePermission>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Dashboard