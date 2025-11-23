import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { userAPI } from '../services/apiService';
import { Sidebar, drawerWidth } from '../components/Sidebar';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function NhanKhau() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userAPI.getAll();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar user={user} navigate={navigate} onLogout={handleLogout} />

      <Box sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Typography variant="h4" gutterBottom>
          Danh sách nhân khẩu
        </Typography>

        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Vai trò</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u._id}>
                    <TableCell>{u._id}</TableCell>
                    <TableCell>{u.ten}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.soDienThoai || '-'}</TableCell>
                    <TableCell>{u.role?.role_name || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default NhanKhau;
