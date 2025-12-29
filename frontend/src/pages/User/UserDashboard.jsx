import React, { useEffect, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import { Home, Users, Wallet, Clock } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { statsAPI } from '../../api/apiService';
import GreetingHeader from '../../feature/dashboard/User/GreetingHeader';
import QuickStatsCards from '../../feature/dashboard/User/QuickStatsCards';
import PaymentChart from '../../feature/dashboard/User/PaymentChart';
import HouseholdInfo from '../../feature/dashboard/User/HouseholdInfo';
import PersonalInfo from '../../feature/dashboard/User/PersonalInfo';
import LoadingState from '../../feature/dashboard/User/LoadingState';

function UserDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Chỉ cần gọi 1 API - getUserDashboard đã bao gồm tất cả
        const dashboardData = await statsAPI.getUserDashboard();
        
        console.log('✅ Dashboard data loaded:', dashboardData);
        
        // Data đã có đầy đủ từ backend
        setStats(dashboardData);
        setError(null);
      } catch (err) {
        console.error('❌ Dashboard error:', err);
        console.error('Response data:', err?.response?.data);
        const errorMessage = err?.response?.data?.message || 'Không thể tải dữ liệu thống kê';
        console.error('Error message:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Chuẩn bị dữ liệu cho các components
  const quickStats = [
    {
      icon: <Home size={32} />,
      label: 'Mã hộ gia đình',
      value: stats?.household?.householdId || '--',
      color: '#2563eb',
    },
    {
      icon: <Users size={32} />,
      label: 'Số thành viên',
      value: stats?.members || '--',
      color: '#16a34a',
    },
    {
      icon: <Wallet size={32} />,
      label: 'Số tiền cần đóng (VNĐ)',
      value: stats?.finance?.total_unpaid != null
        ? stats.finance.total_unpaid.toLocaleString('vi-VN')
        : '--',
      color: '#ea580c',
    },
    {
      icon: <Clock size={32} />,
      label: 'Yêu cầu chờ duyệt',
      value: stats?.pending_requests ?? '--',
      color: '#7c3aed',
    },
  ];

  const paymentData = [
    { 
      name: 'Đã đóng', 
      value: stats?.payment_stats?.paid || 0, 
      color: '#16a34a' 
    },
    { 
      name: 'Chưa đóng', 
      value: stats?.payment_stats?.unpaid || 0, 
      color: '#ef4444' 
    },
  ];

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Nếu user chưa thuộc hộ gia đình nào (MEMBER role)
  if (error && (error.includes('chưa thuộc hộ') || error.includes('chưa thuộc hộ gia đình'))) {
    return (
      <Box sx={{ p: 4 }}>
        <GreetingHeader userName={user?.name} />
        
        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Bạn chưa thuộc hộ gia đình nào</strong><br />
          Vui lòng liên hệ với Tổ trưởng để được thêm vào hộ gia đình. 
          Sau khi được thêm vào hộ, bạn sẽ có thể xem đầy đủ thông tin và thống kê về hộ gia đình của mình.
        </Alert>
        
        <PersonalInfo user={user} />
      </Box>
    );
  }

  // Nếu có lỗi khác (không phải chưa thuộc hộ)
  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  // Dashboard đầy đủ cho user có hộ gia đình
  return (
    <Box sx={{ p: 4 }}>
      {/* Header chào mừng */}
      <GreetingHeader userName={user?.name} />

      {/* 4 Cards thống kê nhanh */}
      <QuickStatsCards statsData={quickStats} />

      {/* Grid 2 cột: Biểu đồ thanh toán + Thông tin hộ */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <PaymentChart paymentData={paymentData} />
        <HouseholdInfo 
          householdData={stats?.household} 
          financeData={stats?.finance}
          membersCount={stats?.members}
        />
      </Grid>

      {/* Thông tin cá nhân */}
      <PersonalInfo user={user} />
    </Box>
  );
}

export default UserDashboard;
