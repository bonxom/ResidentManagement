import { Box } from "@mui/material";
import SidebarForUser, { drawerWidth } from "../components/SidebarForUser";
import Topbar from "../components/Topbar";

export default function MainLayoutForUser({ children }) {
    return (
        <>
            {/* Sidebar */}
            <SidebarForUser />

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
