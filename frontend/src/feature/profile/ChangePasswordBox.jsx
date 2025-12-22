import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordBox() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Đổi mật khẩu:", passwordData);
      // TODO: Gửi yêu cầu đổi mật khẩu đến backend
      alert("Yêu cầu đổi mật khẩu đã được gửi!");

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "16px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 3px 18px rgba(0, 0, 0, 0.7)"
            : "0px 3px 12px rgba(0, 0, 0, 0.08)",
        padding: "24px 32px",
        maxWidth: "1200px",
        margin: "24px",
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: "18px",
          fontWeight: "600",
          mb: 3,
          color: theme.palette.text.primary,
        })}
      >
        Đổi mật khẩu
      </Typography>

      <Grid container spacing={3}>
        {/* Mật khẩu hiện tại */}
        <Grid item xs={12} sm={6}>
          <Typography
            sx={(theme) => ({
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              color: theme.palette.text.primary,
            })}
          >
            Mật khẩu hiện tại <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type={showPassword.currentPassword ? "text" : "password"}
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleShowPassword("currentPassword")}
                    edge="end"
                    size="small"
                  >
                    {showPassword.currentPassword ? (
                      <EyeOff size={18} color="#666" />
                    ) : (
                      <Eye size={18} color="#666" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#F5F7FA",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.currentPassword
                    ? "#d32f2f"
                    : "transparent",
                },
                "&:hover fieldset": {
                  borderColor: errors.currentPassword
                    ? "#d32f2f"
                    : "#E0E0E0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.currentPassword
                    ? "#d32f2f"
                    : "#2D66F5",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        {/* Spacer */}
        <Grid item xs={12} sm={6} />

        {/* Mật khẩu mới */}
        <Grid item xs={12} sm={6}>
          <Typography
            sx={(theme) => ({
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              color: theme.palette.text.primary,
            })}
          >
            Mật khẩu mới <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type={showPassword.newPassword ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleShowPassword("newPassword")}
                    edge="end"
                    size="small"
                  >
                    {showPassword.newPassword ? (
                      <EyeOff size={18} color="#666" />
                    ) : (
                      <Eye size={18} color="#666" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#F5F7FA",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "transparent",
                },
                "&:hover fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "#E0E0E0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "#2D66F5",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
              },
            }}
          />
        </Grid>

        {/* Xác nhận mật khẩu mới */}
        <Grid item xs={12} sm={6}>
          <Typography
            sx={(theme) => ({
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              color: theme.palette.text.primary,
            })}
          >
            Xác nhận mật khẩu mới <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleShowPassword("confirmPassword")}
                    edge="end"
                    size="small"
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff size={18} color="#666" />
                    ) : (
                      <Eye size={18} color="#666" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#F5F7FA",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.confirmPassword
                    ? "#d32f2f"
                    : "transparent",
                },
                "&:hover fieldset": {
                  borderColor: errors.confirmPassword
                    ? "#d32f2f"
                    : "#E0E0E0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.confirmPassword
                    ? "#d32f2f"
                    : "#2D66F5",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#2D66F5",
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            py: 1.2,
            fontSize: "14px",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#1E54D4" },
          }}
        >
          Đổi mật khẩu
        </Button>
      </Box>
    </Box>
  );
}