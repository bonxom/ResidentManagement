import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container, Box, Card, CardContent, TextField, Button, Typography,
  Link, Alert, InputAdornment
} from '@mui/material'
import {Lock, Users, Mail } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { signInSchema } from '../utils/validation'

function SignIn() {
  const navigate = useNavigate()
  const { signIn, isLoading, error: authError } = useAuthStore()

  // Sửa lại state ban đầu
  const [formData, setFormData] = useState({
    email: '', // Đổi từ citizenId
    password: '',
    // Xóa 'role' khỏi đây
  });
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Sửa lại hàm handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Bạn cũng sẽ cần sửa file 'signInSchema'
      signInSchema.parse(formData); 
      setErrors({});

      // Chỉ gửi email và password
      const result = await signIn({
        email: formData.email,
        password: formData.password,
        // Xóa 'role' khỏi đây
      });

      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.errors) {
        const formattedErrors = {}
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message
        })
        setErrors(formattedErrors)
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Users size={48} color="#1976d2" style={{ marginBottom: '16px' }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Đăng nhập hệ thống
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vui lòng nhập email và mật khẩu của bạn
              </Typography>
            </Box>

            {authError && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
                {authError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email" // Đổi name
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email} // Đổi error
                helperText={errors.email} // Đổi helperText
                margin="normal"
                placeholder="example@gmail.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} /> {/* Dùng icon Mail */}
                    </InputAdornment>
                  ),
                }}
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                placeholder="••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
              </Button>

              <Typography variant="body2" align="center">
                Chưa có tài khoản?{' '}
                <Link component={RouterLink} to="/signup" fontWeight="bold">
                  Đăng ký ngay
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default SignIn