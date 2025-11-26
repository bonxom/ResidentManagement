import { Box, Typography, Button, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { Search, Filter, ChevronDown } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function ResidentManagement() {
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
                <Box sx={{ flex: 1, position: "relative" }}>
                    <Topbar />

                    {/* PAGE CONTENT */}
                    <Box sx={{ padding: "24px 32px"}}>

                        {/* TITLE + BUTTON */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
                                Quản lý dân cư
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#2D66F5",
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    px: 4,
                                    py: 1.2,
                                    fontSize: "15px",
                                    "&:hover": { backgroundColor: "#1E54D4" }
                                }}
                            >
                                Tạo mới
                            </Button>
                        </Box>


                        {/* SEARCH BOX */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                backgroundColor: "white",
                                padding: "22px",
                                borderRadius: "12px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                alignItems: "center",
                                mb: 4
                            }}
                        >

                            {/* SEARCH INPUT */}
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: "13px", mb: 1 }}>Tìm kiếm</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Nhập từ khóa..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search size={18} color="#777" />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            background: "#F1F3F6",
                                            borderRadius: "8px",
                                            height: "40px",
                                            "& .MuiInputBase-input": {
                                                padding: "10px 0px",
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* FILTER SELECT */}
                            <Box sx={{ width: "220px" }}>
                                <Typography sx={{ fontSize: "13px", mb: 1 }}>Lọc theo</Typography>

                                <Box
                                    sx={{
                                        backgroundColor: "#F1F3F6",
                                        height: "40px",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        px: 1,
                                        overflow: "hidden",
                                        border: "1px solid #bec0c5ff",
                                        "&:hover": {
                                            borderColor: "#000000ff",
                                        },
                                    }}
                                >

                                    <Filter size={18} color="#555" style={{ marginLeft: 8, marginRight: 6 }} />

                                    <Select
                                        fullWidth
                                        displayEmpty
                                        variant="standard"
                                        disableUnderline
                                        IconComponent={() => (
                                            <ChevronDown size={18} style={{ marginRight: 2 }} />
                                        )}
                                        sx={{
                                            flex: 1,
                                            fontSize: "14px",
                                            backgroundColor: "transparent",


                                            "& .MuiSelect-select": {
                                                backgroundColor: "transparent !important",
                                                paddingY: "10px",
                                                paddingLeft: "6px",
                                            },


                                            "& .MuiSelect-icon": {
                                                backgroundColor: "transparent !important",
                                                width: "24px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            },


                                            "&:hover": {
                                                backgroundColor: "transparent !important",
                                            },


                                            "&.Mui-focused": {
                                                backgroundColor: "transparent !important",
                                            },
                                        }}
                                    >
                                        <MenuItem value="">Tất cả</MenuItem>
                                        <MenuItem value="hokhau">Hộ khẩu</MenuItem>
                                        <MenuItem value="nhankhau">Nhân khẩu</MenuItem>
                                    </Select>
                                </Box>
                            </Box>

                            {/* SEARCH BUTTON */}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#2D66F5",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    height: "40px",
                                    width: "120px",
                                    "&:hover": { backgroundColor: "#1E54D4" },
                                    alignItems: "center",
                                    mt: "26px",
                                }}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>

                        {/* TABLE AREA */}
                        <Box
                            sx={{
                                backgroundColor: "white",
                                height: "595px",
                                borderRadius: "16px",
                                boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography>Bảng thông tin</Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
