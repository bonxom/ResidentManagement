import { Box } from "@mui/material";
import Sidebar, { drawerWidth } from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
    return (
        <>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    minHeight: "100vh",
                    marginLeft: `${drawerWidth}px`,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Topbar */}
                <Topbar />

                {/* Page content */}
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}
