import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Grid } from "@mui/material";

function InfoField({ label, value }) {
  return (
    <Box>
      <Typography 
        sx={{ 
          fontSize: "13px", 
          fontWeight: "500", 
          mb: 1, 
          color: "#666" 
        }}
      >
        {label}
      </Typography>
      <Typography 
        sx={{ 
          fontSize: "15px", 
          fontWeight: "400", 
          color: "#333",
          backgroundColor: "#F5F7FA",
          padding: "12px 14px",
          borderRadius: "8px"
        }}
      >
        {value || "Chưa cập nhật"}
      </Typography>
    </Box>
  );
}

export default function KhaiBaoSinhTuForm({ open, onClose, person, onApprove, onReject }) {
  if (!person) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <DialogContent sx={{ padding: "24px 32px" }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            mb: 3,
            color: "#333",
          }}
        >
          Thông tin khai báo sinh tử
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoField label="Họ và tên" value={person.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Vai trò" value={person.role} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Mã hộ gia đình" value={person.houseHoldID} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Tên chủ hộ" value={person.chuHo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Phân loại" value={person.classification} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Ngày sinh" value={person.dateOfBirth} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Giới tính" value={person.gender} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Số định danh cá nhân" value={person.personalId || "Chưa có (dưới 14 tuổi)"} />
          </Grid>
          <Grid item xs={12}>
            <InfoField label="Địa chỉ" value={person.address} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", gap: 2, padding: "16px 32px 24px" }}>
        <Button
          variant="contained"
          onClick={onApprove}
          sx={{
            minWidth: "140px",
            textTransform: "none",
            backgroundColor: "#a9f5c0",
            color: "#10b981",
            fontWeight: 600,
            borderRadius: "8px",
            py: 1.2,
            fontSize: "15px",
            "&:hover": {
              backgroundColor: "#8de4a8",
            },
          }}
        >
          Phê duyệt
        </Button>
        <Button
          variant="contained"
          onClick={onReject}
          sx={{
            minWidth: "140px",
            textTransform: "none",
            backgroundColor: "#ffcb8a",
            color: "#f97316",
            fontWeight: 600,
            borderRadius: "8px",
            py: 1.2,
            fontSize: "15px",
            "&:hover": {
              backgroundColor: "#fdb863",
            },
          }}
        >
          Không phê duyệt
        </Button>
      </DialogActions>
    </Dialog>
  );
}
