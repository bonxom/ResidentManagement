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

export default function ThuTienForm({ open, onClose, item, onApprove, onReject }) {
  if (!item) return null;

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
          Thông tin thu tiền
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InfoField label="Tên sự kiện" value={item.event} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Mã hộ gia đình" value={item.houseHoldID} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Tên chủ hộ" value={item.chuHo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Số tiền quyên góp" value={`${item.soTien.toLocaleString()} đ`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField label="Ngày tổ chức" value={item.eventDate} />
          </Grid>
          <Grid item xs={12}>
            <InfoField label="Địa điểm" value={item.eventLocation} />
          </Grid>
          <Grid item xs={12}>
            <InfoField label="Ban tổ chức" value={item.organizer} />
          </Grid>
          <Grid item xs={12}>
            <InfoField label="Mô tả" value={item.description} />
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
