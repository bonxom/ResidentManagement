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
                <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
                    <Topbar />

                    {/* PAGE CONTENT */}
                    <Box sx={{ padding: "24px 32px",display:"flex", flexDirection:"column", flex:1}}>

                        {/* TITLE + BUTTON */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
                                Trang chủ
                            </Typography>
                        </Box>


                        {/* TABLE AREA */}
                        <Box
                            sx={{
                                backgroundColor: "white",
                                flex: 1,
                                borderRadius: "16px",
                                boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "auto",
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
