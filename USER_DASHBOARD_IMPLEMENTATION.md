# User Dashboard Implementation Guide

## 📋 Tổng quan

Đã xây dựng Dashboard riêng cho User (MEMBER/HOUSE MEMBER) với các thông tin về hộ gia đình của họ.

## 🎯 Tính năng

### Dashboard User bao gồm:

1. **4 Card thống kê nhanh:**
   - 🏠 Mã hộ gia đình (household ID)
   - 👥 Số thành viên trong hộ
   - 💰 Số tiền cần đóng (chưa đóng)
   - ⏳ Số yêu cầu chờ duyệt

2. **Biểu đồ thanh toán (Pie Chart):**
   - Tiền đã đóng (màu xanh lá)
   - Tiền chưa đóng (màu đỏ)

3. **Thông tin hộ gia đình:**
   - Mã hộ khẩu
   - Địa chỉ
   - Chủ hộ
   - Số thành viên
   - Tình trạng thanh toán

4. **Thông tin cá nhân:**
   - Họ tên, Email, SĐT, Vai trò

## 🔧 Backend API

### Endpoint mới: `/api/stats/user-dashboard`

**Method:** GET  
**Auth:** Required (protect middleware)  
**Description:** Lấy thống kê dashboard cho user về hộ gia đình của họ

**Response:**
```json
{
  "household": {
    "householdId": "HD001",
    "address": "123 Nguyễn Văn A",
    "leaderName": "Nguyễn Văn B"
  },
  "members": 4,
  "finance": {
    "total_due": 1000000,
    "total_paid": 500000,
    "total_unpaid": 500000
  },
  "pending_requests": 2,
  "payment_stats": {
    "paid": 500000,
    "unpaid": 500000,
    "total": 1000000
  }
}
```

**Logic tính toán:**
- `total_due`: Tổng các fee ACTIVE * số người/diện tích (tùy loại fee)
- `total_paid`: Tổng transactions VERIFIED của hộ
- `total_unpaid`: total_due - total_paid
- `pending_requests`: Số request PENDING của user

## 📁 Files đã tạo/sửa

### Backend:
1. ✅ `/backend/controllers/statsController.js`
   - Thêm function `getUserDashboardStats`
   - Cập nhật import Request model

2. ✅ `/backend/routes/statsRoutes.js`
   - Thêm route `/user-dashboard`

### Frontend:
1. ✅ `/frontend/src/api/apiService.js`
   - Thêm `statsAPI.getUserDashboard()`

2. ✅ `/frontend/src/pages/User/UserDashboard.jsx` (NEW)
   - Dashboard component cho user

3. ✅ `/frontend/src/routes/userRoutes.jsx`
   - Import UserDashboard thay vì Dashboard chung

4. ✅ `/frontend/src/routes/leaderRoutes.jsx`
   - Sửa import Dashboard từ `pages/Admin/Dashboard`

5. ✅ `/frontend/src/routes/accountantRoutes.jsx`
   - Sửa import Dashboard từ `pages/Admin/Dashboard`

## 🚀 Cách test

### 1. Restart Backend
```bash
cd backend
# Nhấn Ctrl+C để dừng
npm start
```

### 2. Test với User account
```bash
# Login với account MEMBER hoặc HOUSE MEMBER
# Navigate to /member/dashboard
```

### 3. Kiểm tra:
- ✅ Hiển thị mã hộ gia đình
- ✅ Hiển thị số thành viên
- ✅ Hiển thị số tiền cần đóng
- ✅ Hiển thị số yêu cầu chờ duyệt
- ✅ Biểu đồ thanh toán (đã đóng/chưa đóng)
- ✅ Thông tin hộ gia đình đầy đủ

### 4. Test với Leader account
```bash
# Login với account HAMLET LEADER
# Navigate to /leader/dashboard
```
- ✅ Vẫn hiển thị dashboard admin (toàn bộ hệ thống)

## ⚠️ Lưu ý

1. **User chưa thuộc hộ:**
   - Nếu user chưa có household, API sẽ trả về lỗi 400
   - Frontend hiển thị thông báo yêu cầu liên hệ Tổ trưởng

2. **Permissions:**
   - User cần có permission `VIEW BASIC STATS` (đã được thêm vào config)
   - API chỉ trả về data của hộ mà user thuộc về

3. **Tính toán fee:**
   - Chỉ tính các fee ACTIVE
   - Hỗ trợ 3 loại: PER_HOUSEHOLD, PER_PERSON, PER_AREA
   - Nếu thiếu thông tin (area), mặc định = 0

## 🎨 UI/UX

- **Color scheme:**
  - Đã đóng: #16a34a (green)
  - Chưa đóng: #ef4444 (red)
  - Primary: #667eea (purple gradient)

- **Responsive:**
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns cho stats cards

- **Interactive:**
  - Hover effects trên cards
  - Tooltip trên biểu đồ
  - Smooth transitions

## 📊 Data Flow

```
User Login
    ↓
Navigate to /member/dashboard
    ↓
UserDashboard component mounts
    ↓
Call statsAPI.getUserDashboard()
    ↓
Backend: statsController.getUserDashboardStats
    ↓
    - Check user.household
    - Query Household, Fees, Transactions, Requests
    - Calculate totals
    ↓
Return JSON response
    ↓
Frontend: Display dashboard with charts
```

## ✅ Checklist hoàn thành

- [x] Tạo API backend `/api/stats/user-dashboard`
- [x] Tính toán logic cho fees (3 loại)
- [x] Tính toán transactions và unpaid amount
- [x] Đếm pending requests
- [x] Thêm function vào statsAPI frontend
- [x] Tạo UserDashboard component
- [x] Thiết kế UI với 4 cards + pie chart
- [x] Responsive design
- [x] Error handling
- [x] Cập nhật routes
- [x] Documentation

## 🔮 Suggestions cho tương lai

1. **Real-time updates:**
   - Thêm WebSocket để cập nhật real-time khi có transaction mới

2. **Chi tiết hơn:**
   - Thêm breakdown từng khoản phí
   - Lịch sử thanh toán gần đây

3. **Notifications:**
   - Alert khi có deadline thanh toán
   - Thông báo request được duyệt

4. **Export:**
   - Export PDF thông tin hộ
   - Export lịch sử giao dịch
