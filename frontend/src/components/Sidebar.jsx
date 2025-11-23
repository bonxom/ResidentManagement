import React from 'react';
import { Divider, Toolbar, Drawer, List, ListItem, ListItemText, ListItemButton, Box, Typography, Button } from '@mui/material';
const drawerWidth = 240;

const defaultMenuItems = [
  { text: 'Quản lý nhân khẩu', path: '/nhankhau' },
  { text: 'Quản lý hộ khẩu', path: '/hokhau' },
  { text: 'Quản lý thu chi', path: '/thuchi' },
  { text: 'Danh sách người cần phê duyệt', path: '/pheduyet' },
];

function Sidebar({ user, navigate, onLogout }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box
        sx={{ p: 2, cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        <Typography variant="h6" gutterBottom>
          App quản lý cư dân
        </Typography>
      </Box>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {defaultMenuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mt: 2, px: 2 }}>
          <Box sx={{ mt: 1 }}>
            <Button variant="text" color="error" onClick={onLogout}>
              Đăng xuất
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export { Sidebar, drawerWidth };