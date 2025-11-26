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
import { userAPI } from "../services/apiService";
import { signUpSchema } from "../utils/validation";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
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

    // Check confirm password
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Mật khẩu không trùng khớp" });
      return;
    }

    try {
      // Validate form data
      signUpSchema.parse(formData);
      setErrors({});
      setIsLoading(true);

      // Map payload đúng backend
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        userCardID: formData.userCardID,
      };

      const result = await userAPI.create(payload);

      // Nếu thành công
      alert(
        "Đăng ký thành công!\n\n" +
          "Tài khoản của bạn đang chờ duyệt. " +
          "Bạn sẽ được thông báo khi tài khoản được kích hoạt."
      );
      navigate("/signin");
    } catch (err) {
      if (err.errors) {
        // Lỗi validate
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      } else if (err.message) {
        // Lỗi backend
        setBackendError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Card sx={{ width: "100%", boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Users size={48} color="#1976d2" style={{ marginBottom: "16px" }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Đăng ký tài khoản
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Điền đầy đủ thông tin để gửi yêu cầu xác nhận
              </Typography>
            </Box>

            {backendError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {backendError}
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
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 2 }}>
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
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu đăng ký"}
              </Button>

              <Typography variant="body2" align="center">
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
