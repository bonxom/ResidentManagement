import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { userAPI, householdAPI } from '../services/apiService';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Users,
  Home,
  Shield,
  Key,
  Edit,
  Trash2,
  UserPlus,
  RefreshCw,
} from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [households, setHouseholds] = useState([]);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalHouseholds: 0,
    totalResidents: 0,
    totalToTruong: 0,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, type: null });

  if (!user) {
    navigate('/signin');
    return null;
  }

  const userRole = user.role?.role_name || 'Không có vai trò';
  const isToTruong = userRole.toUpperCase() === 'TỔ TRƯỞNG';

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (isToTruong) {
        const [usersData, householdsData] = await Promise.all([
          userAPI.getAll(),
          householdAPI.getAll(),
        ]);

        setUsers(usersData);
        setHouseholds(householdsData);

        // Calculate statistics
        const toTruongCount = usersData.filter(
          (u) => u.role?.role_name?.toUpperCase() === 'TỔ TRƯỞNG'
        ).length;

        setStatistics({
          totalUsers: usersData.length,
          totalHouseholds: householdsData.length,
          totalResidents: usersData.length - toTruongCount,
          totalToTruong: toTruongCount,
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isToTruong]);

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const handleDeleteUser = async (id) => {
    try {
      await userAPI.delete(id);
      setDeleteDialog({ open: false, id: null, type: null });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa người dùng');
    }
  };

  const handleDeleteHousehold = async (id) => {
    try {
      await householdAPI.delete(id);
      setDeleteDialog({ open: false, id: null, type: null });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa hộ khẩu');
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: `${color}15`,
              p: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon size={32} color={color} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            App quản lý nhân khẩu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vai trò: {userRole}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isToTruong && (
            <Button
              variant="outlined"
              startIcon={<RefreshCw size={20} />}
              onClick={fetchData}
            >
              Làm mới
            </Button>
          )}
          <Button variant="contained" color="error" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Personal Info Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin cá nhân
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                mr: 3,
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {user.ten ? user.ten.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Họ tên
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.ten}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Số điện thoại
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.soDienThoai || 'Chưa cập nhật'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Nơi ở
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.noiO || 'Chưa cập nhật'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Statistics Cards - Only for Tổ trưởng */}
      {isToTruong && (
        <>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Thống kê tổng quan
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Users}
                title="Tổng số người dùng"
                value={statistics.totalUsers}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Home}
                title="Tổng số hộ khẩu"
                value={statistics.totalHouseholds}
                color="#2e7d32"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Users}
                title="Cư dân"
                value={statistics.totalResidents}
                color="#ed6c02"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Shield}
                title="Tổ trưởng"
                value={statistics.totalToTruong}
                color="#9c27b0"
              />
            </Grid>
          </Grid>

          {/* Management Tabs */}
          <Card>
            <CardContent>
              <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                <Tab label="Quản lý người dùng" />
                <Tab label="Quản lý hộ khẩu" />
              </Tabs>

              {/* Users Table */}
              {activeTab === 0 && (
                <Box sx={{ mt: 3 }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Họ tên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số điện thoại</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nơi ở</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Vai trò</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              Hành động
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((u) => (
                            <TableRow key={u._id} hover>
                              <TableCell>{u.ten}</TableCell>
                              <TableCell>{u.email}</TableCell>
                              <TableCell>{u.soDienThoai || '-'}</TableCell>
                              <TableCell>{u.noiO || '-'}</TableCell>
                              <TableCell>
                                <Chip
                                  label={u.role?.role_name || 'N/A'}
                                  size="small"
                                  color={
                                    u.role?.role_name?.toUpperCase() === 'TỔ TRƯỞNG'
                                      ? 'primary'
                                      : 'default'
                                  }
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    setDeleteDialog({ open: true, id: u._id, type: 'user' })
                                  }
                                >
                                  <Trash2 size={18} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              )}

              {/* Households Table */}
              {activeTab === 1 && (
                <Box sx={{ mt: 3 }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Địa chỉ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Chủ hộ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Số thành viên</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              Hành động
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {households.map((h) => (
                            <TableRow key={h._id} hover>
                              <TableCell>{h.address || '-'}</TableCell>
                              <TableCell>{h.chuHo?.ten || '-'}</TableCell>
                              <TableCell>{h.members?.length || 0}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    setDeleteDialog({ open: true, id: h._id, type: 'household' })
                                  }
                                >
                                  <Trash2 size={18} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null, type: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa {deleteDialog.type === 'user' ? 'người dùng' : 'hộ khẩu'} này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null, type: null })}>
            Hủy
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (deleteDialog.type === 'user') {
                handleDeleteUser(deleteDialog.id);
              } else {
                handleDeleteHousehold(deleteDialog.id);
              }
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;