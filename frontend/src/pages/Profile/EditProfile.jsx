import { Box, Typography, Button, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import avatarImg from "../../assets/image.jpg";
import { Search, Filter, ChevronDown, Camera } from "lucide-react";
import { Link } from "react-router-dom";



export default function EditProfile() {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
            }}
        >
            <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
                    <Topbar />

                    {/* PAGE CONTENT */}
                    <Box sx={{ padding: "24px 32px", display: "flex", flexDirection: "column", flex: 1 }}>

                        {/* TITLE + BUTTON */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
                                Thông tin cá nhân
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                backgroundColor: "white",
                                flex: 1,
                                borderRadius: "16px",
                                boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                overflow: "auto",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
                                    gap: 15,
                                    alignItems: "flex-start",
                                    ml: 10,
                                    mt: 10,
                                    mb: 10,
                                    mr: 10,
                                }}
                            >
                                {<Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: 250,
                                            height: 250,
                                            mb: 2,
                                        }}
                                    >
                                        <img
                                            src={avatarImg}
                                            alt="Avatar"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "999px",
                                                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
                                                objectFit: "cover",
                                            }}
                                        />

                                        {/* ICON CHỈNH SỬA Ở GÓC */}
                                        <Button
                                            sx={{
                                                minWidth: 0,
                                                position: "absolute",
                                                bottom: 14,
                                                right: 14,
                                                borderRadius: "999px",
                                                padding: "4px",
                                                backgroundColor: "white",
                                                boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
                                                border: "1px solid #e5e7eb",
                                                "&:hover": {
                                                    backgroundColor: "#f3f4f6",
                                                },
                                            }}
                                        >
                                            <Camera size={16} color="#111827" />
                                        </Button>
                                    </Box>



                                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                        Nguyễn Văn A
                                    </Typography>

                                    <Button
                                        component={Link}
                                        to="/mainprofile"
                                        variant="contained"
                                        sx={{
                                            width: 170,
                                            textTransform: "none",
                                            backgroundColor: "#2D66F5",
                                            borderRadius: 2,
                                            px: 3,
                                            "&:hover": { backgroundColor: "#1E54D4" }
                                        }}
                                    >
                                        Lưu hồ sơ
                                    </Button>

                                </Box>
                                }


                                {<Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                        gap: 3,
                                        mt: 10,
                                        ml: 10,
                                    }}
                                >
                                    <TextField label="Họ" size="small" defaultValue="Nguyễn" />
                                    <TextField label="Tên" size="small" defaultValue="Văn A" />

                                    <TextField label="Email" size="small" defaultValue="nguyenvana@gmail.com" />
                                    <TextField label="Số điện thoại" size="small" defaultValue="0987654321" />

                                    <TextField
                                        label="Địa chỉ"
                                        size="small"
                                        sx={{ gridColumn: "span 2" }}
                                        fullWidth
                                        defaultValue="123 Nguyễn Trãi, Hà Nội"
                                    />

                                    <TextField label="Thành phố" size="small" defaultValue="Hà Nội" />
                                    <TextField label="Quốc gia" size="small" defaultValue="Việt Nam" />
                                </Box>
                                }
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
