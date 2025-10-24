import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container, Box, Card, CardContent, TextField, Button, Typography,
  Link, Alert, InputAdornment, MenuItem
} from '@mui/material'
import { CreditCard, Lock, Users } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { signInSchema } from '../utils/validation'
import { ROLES, ROLE_DESCRIPTIONS } from '../constants/roles'

const roleOptions = [
  { value: ROLES.CU_DAN, label: ROLE_DESCRIPTIONS[ROLES.CU_DAN] },
  { value: ROLES.CHU_HO, label: ROLE_DESCRIPTIONS[ROLES.CHU_HO] },
  { value: ROLES.KIEM_TOAN, label: ROLE_DESCRIPTIONS[ROLES.KIEM_TOAN] },
  { value: ROLES.TO_DAN_PHO, label: ROLE_DESCRIPTIONS[ROLES.TO_DAN_PHO] },
]

function SignIn() {
  const navigate = useNavigate()
  const { signIn, isLoading, error: authError } = useAuthStore()

  const [formData, setFormData] = useState({
    citizenId: '',
    password: '',
    role: ROLES.TDANPHO,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      signInSchema.parse(formData)
      setErrors({})

      const result = await signIn({
        citizenId: formData.citizenId,
        password: formData.password,
        role: formData.role,
      })

      if (result.success) {
        navigate('/dashboard')
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
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Users size={48} color="#1976d2" style={{ marginBottom: '16px' }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Đăng nhập hệ thống
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chọn vai trò và nhập thông tin đăng nhập
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
                label="Số căn cước công dân"
                name="citizenId"
                value={formData.citizenId}
                onChange={handleChange}
                error={!!errors.citizenId}
                helperText={errors.citizenId || 'Nhập đủ 12 chữ số'}
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
                autoComplete="username"
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

              <TextField
                fullWidth
                select
                label="Chọn vai trò"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
                margin="normal"
                SelectProps={{
                  MenuProps: { disablePortal: true },
                }}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

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