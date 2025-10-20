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
} from '@mui/material'
import { CreditCard, Phone, User, Users } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { signUpSchema } from '../utils/validation'

function SignUp() {
  const navigate = useNavigate()
  const { signUp, loading, error, clearError } = useAuthStore()
  
  const [formData, setFormData] = useState({
    fullName: '',
    citizenId: '',
    phoneNumber: '',
    confirmPassword: '',
  })
  
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Chỉ cho phép nhập số cho căn cước và số điện thoại
    if ((name === 'citizenId' || name === 'phoneNumber' || name === 'confirmPassword') && value) {
      if (!/^\d*$/.test(value)) {
        return
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error khi user nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (error) clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate với Zod
    try {
      signUpSchema.parse(formData)
      setErrors({})
      
      // Gọi API đăng ký
      const result = await signUp(formData)
      
      if (result.success) {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.errors) {
        const formattedErrors = {}
        err.errors.forEach(error => {
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
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Users size={48} color="#1976d2" style={{ marginBottom: '16px' }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Đăng Ký Thông Tin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đăng ký thông tin nhân khẩu mới
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
                {error}
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
              />

              <TextField
                fullWidth
                label="Số căn cước công dân"
                name="citizenId"
                value={formData.citizenId}
                onChange={handleChange}
                error={!!errors.citizenId}
                helperText={errors.citizenId || '12 chữ số'}
                margin="normal"
                placeholder="001234567890"
                inputProps={{ maxLength: 12 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard size={20} />
                    </InputAdornment>
                  ),
                }}
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
                placeholder="0912345678"
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Xác nhận số căn cước"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || 'Nhập lại số căn cước để xác nhận'}
                margin="normal"
                placeholder="001234567890"
                inputProps={{ maxLength: 12 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
              </Button>

              <Typography variant="body2" align="center">
                Đã đăng ký thông tin?{' '}
                <Link component={RouterLink} to="/signin" fontWeight="bold">
                  Đăng nhập ngay
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