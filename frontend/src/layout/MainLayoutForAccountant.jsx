import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarForAccountant, {
  drawerWidthCollapsed,
} from "../components/SidebarForAccountant";
import Topbar from "../components/Topbar";
import BubbleChat from "../components/Chat/BubbleChat";

// ... (các phần import giữ nguyên)

export default function MainLayoutForAccountant() {
  const [sidebarWidth, setSidebarWidth] = useState(drawerWidthCollapsed);

  return (
    <>
      {/* Sidebar - SỬA LẠI DÒNG NÀY */}
      <SidebarForAccountant onWidthChange={setSidebarWidth} />

      {/* Main content area */}
      <Box
        sx={{
          // ... (giữ nguyên các style khác)
          marginLeft: `${sidebarWidth}px`, // Khoảng cách này sẽ tự động cập nhật khi Sidebar co giãn
          transition: "margin-left 0.3s ease",
        }}
      >
        <Topbar />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>

      {/* Floating Chat Bubble */}
      <BubbleChat />
    </>
  );
}
