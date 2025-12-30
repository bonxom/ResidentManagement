import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { drawerWidthCollapsed } from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BubbleChat from "../components/Chat/BubbleChat";

export default function MainLayout() {
    const [sidebarWidth, setSidebarWidth] = useState(drawerWidthCollapsed);

    return (
        <>
            {/* Sidebar */}
            <Sidebar onWidthChange={setSidebarWidth} />

            {/* Main content area */}
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    minHeight: "100vh",
                    marginLeft: `${sidebarWidth}px`,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.3s ease",
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
                    <Outlet />
                </Box>
            </Box>

            {/* Floating Chat Bubble */}
            <BubbleChat />
        </>
    );
}
