# 🏘️ Frontend Hệ Thống Quản Lý Nhân Khẩu Tổ Dân Phố

Web app quản lý nhân khẩu

## 🚀 Công nghệ sử dụng

- **Frontend Framework**: React 18 + Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Validation**: Zod
- **Icons**: Lucide React
- **Styling**: Emotion + MUI

## 👥 Hệ thống phân quyền

### 1. Tổ Trưởng Tổ Dân Phố 👑
**Quyền hạn**: Full quyền
- Quản lý toàn bộ cư dân và hộ gia đình
- Quản lý tài chính, duyệt các khoản chi
- Tạo thông báo, quản lý đóng góp
- Phân quyền người dùng
- Xem thống kê, xuất dữ liệu

**Tài khoản test:**
- Căn cước: `001234567890`
- SĐT: `0912345678`

### 2. Kiểm Toán 🧮
**Quyền hạn**: Chuyên về tài chính
- Xem tất cả tài chính
- Kiểm toán sổ sách
- Quản lý các khoản thu/chi
- Xem thống kê tài chính

**Tài khoản test:**
- Căn cước: `001234567891`
- SĐT: `0912345679`

### 3. Chủ Hộ 🏠
**Quyền hạn**: Quản lý hộ gia đình
- Xem và cập nhật thông tin hộ
- Quản lý thành viên trong hộ
- Xem tài chính của hộ
- Thanh toán các khoản đóng góp

**Tài khoản test:**
- Căn cước: `001234567892`
- SĐT: `0912345680`

### 4. Cư Dân 👤
**Quyền hạn**: Quyền cơ bản
- Xem thông tin cá nhân
- Xem thông tin hộ gia đình
- Xem thông báo
- Xem các khoản đóng góp

**Tài khoản test:**
- Căn cước: `001234567893`
- SĐT: `0912345681`

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Components tái sử dụng
│   ├── ProtectedRoute.jsx
│   ├── RoleBadge.jsx
│   └── RequirePermission.jsx
├── config/             # Cấu hình
│   └── axios.js
├── constants/          # Hằng số
│   └── roles.js
├── pages/              # Các trang
│   ├── Dashboard.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── services/           # API services
│   └── mockApi.js
├── store/              # State management
│   └── authStore.js
├── utils/              # Tiện ích
│   └── validation.js
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🌟 Tính năng chính

### Authentication
- ✅ Đăng nhập bằng căn cước + số điện thoại
- ✅ Đăng ký tài khoản mới
- ✅ Protected routes với JWT
- ✅ Auto logout khi token hết hạn

### Authorization
- ✅ Role-Based Access Control (RBAC)
- ✅ 4 cấp độ phân quyền
- ✅ Component-level permissions
- ✅ Dynamic UI based on roles

### UI/UX
- ✅ Responsive design
- ✅ Material Design
- ✅ Dark/Light mode ready
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation

## 🔐 Security

- Token-based authentication
- Protected routes
- Permission-based access control
- Input validation với Zod
- XSS protection
- CORS handling

## 📝 API Integration

Hiện tại đang sử dụng Mock API để demo ứng dụng. Cần kết nối với backend thật

1. Mở file `src/store/authStore.js`
2. Uncomment dòng: `import api from '../config/axios'`
3. Comment dòng: `import { mockApi } from '../services/mockApi'`
4. Thay thế các `mockApi.xxx()` bằng `api.post()` hoặc `api.get()`

### Backend API endpoints cần có:

```
POST /api/auth/signup    # Đăng ký
POST /api/auth/signin    # Đăng nhập
GET  /api/auth/me        # Verify token
```

### Response format:

**Success:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "fullName": "...",
    "citizenId": "...",
    "phoneNumber": "...",
    "role": "...",
    "address": "...",
    "householdId": "..."
  },
  "token": "jwt_token_here"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Thông báo lỗi"
}
```

## 🚧 Roadmap

- [ ] Quản lý cư dân
- [ ] Quản lý hộ gia đình
- [ ] Quản lý tài chính
- [ ] Hệ thống thông báo
- [ ] Báo cáo thống kê
- [ ] Export dữ liệu
- [ ] Tìm kiếm và filter
- [ ] Upload ảnh đại diện
- [ ] Chat/messaging
- [ ] Push notifications

## 📄 License

MIT

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email your-email@example.com or open an issue.