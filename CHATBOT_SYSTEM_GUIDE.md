# Hướng dẫn hệ thống Chatbot

## Tổng quan
Hệ thống chatbot cho phép giao tiếp giữa Admin, Kế toán và các Chủ hộ trong cộng đồng. Cư dân bình thường không có quyền tham gia chat.

## Cấu trúc hệ thống

### Backend

#### 1. Models
- **Message.js**: Lưu trữ tin nhắn
  - sender: Người gửi
  - content: Nội dung tin nhắn
  - messageType: Loại tin nhắn (text, image, file)
  - isRead: Danh sách người đã đọc
  - replyTo: Tin nhắn được reply
  - isDeleted: Trạng thái xóa

- **ChatParticipant.js**: Quản lý người tham gia
  - user: User tham gia
  - role: Vai trò (ADMIN, ACCOUNTANT, HOUSEHOLD_LEADER)
  - isActive: Trạng thái hoạt động
  - lastSeen: Lần cuối online
  - notificationSettings: Cài đặt thông báo

#### 2. Controllers (chatController.js)
- `getMessages`: Lấy danh sách tin nhắn
- `sendMessage`: Gửi tin nhắn mới
- `getChatParticipants`: Lấy danh sách người tham gia
- `updateOnlineStatus`: Cập nhật trạng thái online
- `deleteMessage`: Xóa tin nhắn
- `initializeChatParticipants`: Khởi tạo danh sách người tham gia

#### 3. Routes (chatRoutes.js)
- `GET /api/chat/messages` - Lấy tin nhắn
- `POST /api/chat/messages` - Gửi tin nhắn
- `GET /api/chat/participants` - Lấy người tham gia
- `PUT /api/chat/status` - Cập nhật trạng thái
- `DELETE /api/chat/messages/:id` - Xóa tin nhắn
- `POST /api/chat/initialize` - Khởi tạo chat

### Frontend

#### 1. Components
- **ChatButton.jsx**: Nút chat trên topbar
  - Badge hiển thị số tin nhắn chưa đọc
  - Toggle mở/đóng chat window

- **ChatWindow.jsx**: Cửa sổ chat chính
  - Hiển thị tin nhắn theo thời gian
  - Gửi tin nhắn mới
  - Reply tin nhắn
  - Xóa tin nhắn
  - Hiển thị danh sách người tham gia

#### 2. API Service (chatAPI)
- `getMessages`: Lấy tin nhắn
- `sendMessage`: Gửi tin nhắn
- `getParticipants`: Lấy người tham gia
- `updateStatus`: Cập nhật trạng thái
- `deleteMessage`: Xóa tin nhắn
- `initializeChat`: Khởi tạo chat

## Quyền hạn

### Người có quyền tham gia chat:
1. **Admin (HAMLET LEADER)**
   - Xem tất cả tin nhắn
   - Gửi tin nhắn
   - Xóa bất kỳ tin nhắn nào
   - Khởi tạo hệ thống chat

2. **Kế toán (ACCOUNTANT)**
   - Xem tất cả tin nhắn
   - Gửi tin nhắn
   - Xóa tin nhắn của mình

3. **Chủ hộ (HOUSEHOLD_LEADER)**
   - Xem tất cả tin nhắn
   - Gửi tin nhắn
   - Xóa tin nhắn của mình

### Người không có quyền:
- **Cư dân bình thường (HOUSE MEMBER, MEMBER)**: Không thể truy cập chat

## Cách sử dụng

### 1. Khởi tạo hệ thống (Admin)
```bash
POST /api/chat/initialize
```
- Chỉ Admin mới có quyền chạy
- Tự động thêm tất cả Admin, Kế toán và Chủ hộ vào chat

### 2. Truy cập chat
1. Nhấn vào icon tin nhắn trên topbar
2. Chat window sẽ mở ở góc dưới bên phải
3. Tự động load tin nhắn gần đây

### 3. Gửi tin nhắn
1. Nhập nội dung vào ô input
2. Nhấn Enter hoặc nút Send
3. Tin nhắn hiển thị ngay lập tức

### 4. Reply tin nhắn
1. Nhấn icon Reply trên tin nhắn muốn trả lời
2. Nhập nội dung reply
3. Gửi tin nhắn

### 5. Xóa tin nhắn
1. Nhấn icon Delete trên tin nhắn
2. Chỉ có thể xóa tin nhắn của mình (trừ Admin)
3. Tin nhắn sẽ hiển thị "Tin nhắn đã được xóa"

### 6. Xem người tham gia
1. Nhấn icon People trên header chat
2. Danh sách người tham gia hiển thị với vai trò

## Tính năng

### 1. Real-time (Chuẩn bị)
- Tin nhắn hiển thị ngay lập tức
- Thông báo khi có tin nhắn mới
- Trạng thái online/offline

### 2. Giao diện
- Thiết kế giống Messenger
- Responsive trên mobile
- Tin nhắn của mình ở bên phải (màu xanh)
- Tin nhắn người khác ở bên trái (màu trắng)

### 3. Phân quyền rõ ràng
- Badge màu sắc theo vai trò:
  - Admin: Đỏ
  - Kế toán: Xanh dương  
  - Chủ hộ: Xanh lá

### 4. Tính năng nâng cao
- Reply tin nhắn
- Xóa tin nhắn
- Đánh dấu đã đọc
- Hiển thị thời gian
- Scroll tự động

## Cài đặt

### 1. Backend
```bash
# Đã thêm routes vào index.js
app.use("/api/chat", chatRoutes);
```

### 2. Frontend
```bash
# Đã thêm ChatButton vào Topbar.jsx
import ChatButton from "./Chat/ChatButton";
```

### 3. Database
- Tự động tạo collections: `messages`, `chatparticipants`
- Chạy API initialize để thêm người tham gia

## Test

### 1. Khởi tạo
```bash
POST /api/chat/initialize
Authorization: Bearer <admin_token>
```

### 2. Gửi tin nhắn
```bash
POST /api/chat/messages
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "content": "Hello everyone!"
}
```

### 3. Lấy tin nhắn
```bash
GET /api/chat/messages?limit=20
Authorization: Bearer <user_token>
```

## Troubleshooting

### Lỗi 403 - Không có quyền
- Kiểm tra user có trong ChatParticipant không
- Chạy lại API initialize
- Kiểm tra role của user

### Tin nhắn không hiển thị
- Kiểm tra API getMessages
- Kiểm tra populate sender
- Kiểm tra isDeleted = false

### Chat button không hiển thị
- Kiểm tra import ChatButton trong Topbar
- Kiểm tra user có quyền không
- Kiểm tra console errors

## Mở rộng tương lai

### 1. Real-time với Socket.IO
```javascript
// Backend
io.emit('new-message', message);

// Frontend  
socket.on('new-message', (message) => {
  setMessages(prev => [...prev, message]);
});
```

### 2. Upload file/hình ảnh
- Thêm messageType: "image", "file"
- Upload endpoint
- Hiển thị preview

### 3. Emoji và sticker
- Emoji picker
- Custom stickers
- Reaction tin nhắn

### 4. Thông báo push
- Browser notification
- Email notification
- Mobile push (nếu có app)

Hệ thống chat đã sẵn sàng sử dụng! 🎉