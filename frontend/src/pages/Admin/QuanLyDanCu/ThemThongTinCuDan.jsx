import { Box, Typography, TextField, MenuItem, Button, Paper, Tabs, Tab, Alert } from "@mui/material";
import { useState } from "react";
import { UserPlus, Users } from "lucide-react";

export default function ThemThongTinCuDan() {
  const [tabIndex, setTabIndex] = useState(0); // 0: Thêm dân cư, 1: Thêm kế toán

  // State cho form Dân cư
  const [danCuData, setDanCuData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Việt Nam",
    personalId: "",
    permanentAddress: "",
    household: "",
    relationshipToHead: "",
    email: "",
    phoneNumber: "",
  });

  // State cho form Kế toán
  const [keToanData, setKeToanData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Việt Nam",
    personalId: "",
    email: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Danh sách quan hệ với chủ hộ
  const relationships = [
    "Chủ hộ",
    "Vợ/Chồng",
    "Con",
    "Cha/Mẹ",
    "Anh/Chị/Em",
    "Ông/Bà",
    "Cháu",
    "Khác"
  ];

  const handleSubmitDanCu = (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate
    if (!danCuData.name.trim() || !danCuData.email.trim() || !danCuData.personalId.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    // TODO: Gọi API để thêm dân cư
    console.log("Thêm dân cư:", { ...danCuData, password: "12345678", role: "MEMBER" });
    
    setSuccessMessage("Thêm dân cư thành công! Mật khẩu mặc định: 12345678");
    
    // Reset form
    setDanCuData({
      name: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Việt Nam",
      personalId: "",
      permanentAddress: "",
      household: "",
      relationshipToHead: "",
      email: "",
      phoneNumber: "",
    });

    // Clear success message sau 5s
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleSubmitKeToan = (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate
    if (!keToanData.name.trim() || !keToanData.email.trim() || !keToanData.personalId.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    // TODO: Gọi API để thêm kế toán
    console.log("Thêm kế toán:", { ...keToanData, password: "12345678", role: "ACCOUNTANT" });
    
    setSuccessMessage("Thêm kế toán thành công! Mật khẩu mặc định: 12345678");
    
    // Reset form
    setKeToanData({
      name: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Việt Nam",
      personalId: "",
      email: "",
      phoneNumber: "",
    });

    // Clear success message sau 5s
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          sx={{ 
            fontSize: '28px', 
            fontWeight: 700,
            color: '#1e293b',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <UserPlus size={32} />
          Thêm thông tin cư dân
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#64748b' }}>
          Thêm dân cư hoặc kế toán vào hệ thống. Mật khẩu mặc định: 12345678
        </Typography>
      </Box>

      {/* Alert Messages */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      )}

      {/* Form Container */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: "16px",
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => {
            setTabIndex(newValue);
            setSuccessMessage("");
            setErrorMessage("");
          }}
          variant="fullWidth"
          sx={{ 
            mb: 4,
            '& .MuiTab-root': {
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              py: 2,
            },
            '& .Mui-selected': {
              color: '#667eea',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#667eea',
              height: 3,
            }
          }}
        >
          <Tab 
            label="Thêm Dân cư" 
            icon={<Users size={20} />} 
            iconPosition="start"
          />
          <Tab 
            label="Thêm Kế toán" 
            icon={<UserPlus size={20} />} 
            iconPosition="start"
          />
        </Tabs>

        {/* Form Thêm Dân cư */}
        {tabIndex === 0 && (
          <form onSubmit={handleSubmitDanCu}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3 
              }}
            >
              <TextField
                label="Họ và tên"
                value={danCuData.name}
                onChange={(e) => setDanCuData({ ...danCuData, name: e.target.value })}
                required
                fullWidth
                placeholder="Nguyễn Văn A"
              />

              <TextField
                label="Ngày sinh"
                type="date"
                value={danCuData.dateOfBirth}
                onChange={(e) => setDanCuData({ ...danCuData, dateOfBirth: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />

              <TextField
                label="Giới tính"
                select
                value={danCuData.gender}
                onChange={(e) => setDanCuData({ ...danCuData, gender: e.target.value })}
                required
                fullWidth
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </TextField>

              <TextField
                label="Quốc tịch"
                value={danCuData.nationality}
                onChange={(e) => setDanCuData({ ...danCuData, nationality: e.target.value })}
                required
                fullWidth
              />

              <TextField
                label="Số định danh cá nhân (CCCD)"
                value={danCuData.personalId}
                onChange={(e) => setDanCuData({ ...danCuData, personalId: e.target.value })}
                required
                fullWidth
                placeholder="001234567890"
                inputProps={{ maxLength: 12 }}
              />

              <TextField
                label="Số điện thoại"
                value={danCuData.phoneNumber}
                onChange={(e) => setDanCuData({ ...danCuData, phoneNumber: e.target.value })}
                required
                fullWidth
                placeholder="0123456789"
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                label="Email"
                type="email"
                value={danCuData.email}
                onChange={(e) => setDanCuData({ ...danCuData, email: e.target.value })}
                required
                fullWidth
                placeholder="nguyenvana@gmail.com"
                sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
              />

              <TextField
                label="Địa chỉ thường trú"
                value={danCuData.permanentAddress}
                onChange={(e) => setDanCuData({ ...danCuData, permanentAddress: e.target.value })}
                required
                fullWidth
                multiline
                rows={2}
                placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
              />

              <TextField
                label="Hộ gia đình"
                value={danCuData.household}
                onChange={(e) => setDanCuData({ ...danCuData, household: e.target.value })}
                required
                fullWidth
                placeholder="HGĐ-001"
              />

              <TextField
                label="Quan hệ với chủ hộ"
                select
                value={danCuData.relationshipToHead}
                onChange={(e) => setDanCuData({ ...danCuData, relationshipToHead: e.target.value })}
                required
                fullWidth
              >
                {relationships.map((relation) => (
                  <MenuItem key={relation} value={relation}>
                    {relation}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setDanCuData({
                  name: "",
                  dateOfBirth: "",
                  gender: "",
                  nationality: "Việt Nam",
                  personalId: "",
                  permanentAddress: "",
                  household: "",
                  relationshipToHead: "",
                  email: "",
                  phoneNumber: "",
                })}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Xóa form
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                  }
                }}
              >
                Thêm dân cư
              </Button>
            </Box>
          </form>
        )}

        {/* Form Thêm Kế toán */}
        {tabIndex === 1 && (
          <form onSubmit={handleSubmitKeToan}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3 
              }}
            >
              <TextField
                label="Họ và tên"
                value={keToanData.name}
                onChange={(e) => setKeToanData({ ...keToanData, name: e.target.value })}
                required
                fullWidth
                placeholder="Nguyễn Thị B"
              />

              <TextField
                label="Ngày sinh"
                type="date"
                value={keToanData.dateOfBirth}
                onChange={(e) => setKeToanData({ ...keToanData, dateOfBirth: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />

              <TextField
                label="Giới tính"
                select
                value={keToanData.gender}
                onChange={(e) => setKeToanData({ ...keToanData, gender: e.target.value })}
                required
                fullWidth
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </TextField>

              <TextField
                label="Quốc tịch"
                value={keToanData.nationality}
                onChange={(e) => setKeToanData({ ...keToanData, nationality: e.target.value })}
                required
                fullWidth
              />

              <TextField
                label="Số định danh cá nhân (CCCD)"
                value={keToanData.personalId}
                onChange={(e) => setKeToanData({ ...keToanData, personalId: e.target.value })}
                required
                fullWidth
                placeholder="001234567890"
                inputProps={{ maxLength: 12 }}
              />

              <TextField
                label="Số điện thoại"
                value={keToanData.phoneNumber}
                onChange={(e) => setKeToanData({ ...keToanData, phoneNumber: e.target.value })}
                required
                fullWidth
                placeholder="0123456789"
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                label="Email"
                type="email"
                value={keToanData.email}
                onChange={(e) => setKeToanData({ ...keToanData, email: e.target.value })}
                required
                fullWidth
                placeholder="ketoan@gmail.com"
                sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
              />
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setKeToanData({
                  name: "",
                  dateOfBirth: "",
                  gender: "",
                  nationality: "Việt Nam",
                  personalId: "",
                  email: "",
                  phoneNumber: "",
                })}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Xóa form
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                  }
                }}
              >
                Thêm kế toán
              </Button>
            </Box>
          </form>
        )}

        {/* Password Note */}
        <Box 
          sx={{ 
            mt: 4, 
            p: 3, 
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}
        >
          <Typography sx={{ fontSize: '14px', color: '#64748b', mb: 1 }}>
            <strong>Lưu ý:</strong>
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748b' }}>
            • Mật khẩu mặc định cho tài khoản mới: <strong>12345678</strong>
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748b' }}>
            • Vui lòng thông báo cho người dùng đổi mật khẩu sau lần đăng nhập đầu tiên
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
