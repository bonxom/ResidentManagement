import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  MenuItem,
} from '@mui/material'
import {
  CreditCard,
  Phone,
  Home,
  Mail,
  User,
  MapPin,
  Lock,
  Users,
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import { signUpSchema } from '../utils/validation'
import { ROLES, ROLE_DESCRIPTIONS } from '../constants/roles'


function SignUp() {
  const navigate = useNavigate()
  const { signUp, isLoading, error: authError } = useAuthStore()

  // Sửa lại state ban đầu
const [formData, setFormData] = useState({
  fullName: '', // Sẽ map sang 'ten'
  phoneNumber: '', // Sẽ map sang 'soDienThoai'
  email: '',
  address: '', // Sẽ map sang 'noiO'
  password: '',
  confirmPassword: '',
  // Xóa citizenId, curAddress, householdBookId, role
});

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'citizenId' || name === 'phoneNumber') {
      if (value && !/^\d*$/.test(value)) return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error khi user nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      signUpSchema.parse(formData)
      setErrors({})

      const result = await signUp(formData)

      if (result.success) {
        alert(
          'Đăng ký thành công!\n\n' +
          'Tài khoản của bạn đang chờ duyệt. ' +
          'Bạn sẽ được thông báo khi tài khoản được kích hoạt.'
        )
        navigate('/signin')
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
  }

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
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Users
                size={48}
                color="#1976d2"
                style={{ marginBottom: '16px' }}
              />
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                Đăng ký tài khoản
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Điền đầy đủ thông tin để gửi yêu cầu xác nhận
              </Typography>
            </Box>

            {authError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                margin="normal"
                placeholder="Nguyễn Văn A"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="name"
              />

              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber || 'VD: 0912345678'}
                margin="normal"
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="tel"
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                placeholder="example@gmail.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Địa chỉ thường trú"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                margin="normal"
                placeholder="Số nhà, phường/xã, quận/huyện, tỉnh/thành phố"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                      <MapPin size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'Tối thiểu 6 ký tự'}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="new-password"
              />

              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="new-password"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu đăng ký'}
              </Button>

              <Typography variant="body2" align="center">
                Đã có tài khoản?{' '}
                <Link component={RouterLink} to="/signin" fontWeight="bold">
                  Đăng nhập
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default SignUp