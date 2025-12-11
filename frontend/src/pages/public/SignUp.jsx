import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import { IdCard, Phone, Mail, User, MapPin, Lock, Users } from "lucide-react";
import { userAPI } from "../../services/apiService";
import { signUpSchema } from "../../utils/validation";
import "./style/SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    userCardID: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userCardID" || name === "phoneNumber") {
      if (value && !/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (backendError) setBackendError("");
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data bằng Zod
      signUpSchema.parse(formData);
      setErrors({});
      setIsLoading(true);

      await userAPI.create(formData);

      alert(
        "Đăng ký thành công!\n\n" +
          "Tài khoản của bạn đang chờ duyệt. " +
          "Bạn sẽ được thông báo khi tài khoản được kích hoạt."
      );
      navigate("/signin");
    } catch (err) {
      if (err.errors) {
        // Nếu là lỗi Zod
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      } else if (err.message) {
        // Lỗi từ backend
        setBackendError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container maxWidth="sm">
      <Box className="signup-container">
        <Card className="signup-card">
          <CardContent className="signup-card-content">
            <Box className="signup-header">
              <Users size={48} color="#1976d2" className="signup-icon" />
              <Typography variant="h4" component="h1" gutterBottom className="signup-title">
                Đăng ký tài khoản
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Điền đầy đủ thông tin để gửi yêu cầu xác nhận
              </Typography>
            </Box>

            {backendError && (
              <Alert severity="error" className="signup-alert">
                {backendError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
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
                label="Căn cước công dân"
                name="userCardID"
                type="text"
                value={formData.userCardID}
                onChange={handleChange}
                error={!!errors.userCardID}
                helperText={errors.userCardID}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IdCard size={20} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="idcard"
              />

              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber || "VD: 0912345678"}
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
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                margin="normal"
                placeholder="Số nhà, phường/xã, quận/huyện, tỉnh/thành phố"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="signup-location-adornment">
                      <MapPin size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Ngày sinh"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || "Tối thiểu 6 ký tự"}
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
                className="signup-button"
              >
                {isLoading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu đăng ký"}
              </Button>

              <Typography variant="body2" className="signup-footer">
                Đã có tài khoản?{" "}
                <Link component={RouterLink} to="/signin" fontWeight="bold">
                  Đăng nhập
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default SignUp;
