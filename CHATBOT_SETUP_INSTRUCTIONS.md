# Hướng dẫn cài đặt Chatbot System

## Bước 1: Khởi động Backend

### 1.1 Restart Backend Server
```bash
cd backend
npm start
```

Backend sẽ tự động:
- Tạo collections `messages` và `chatparticipants`
- Load các models mới
- Đăng ký routes `/api/chat/*`

### 1.2 Kiểm tra Backend
Mở browser và truy cập:
```
http://localhost:3000/api/chat/participants
```
Nếu trả về lỗi 403 là bình thường (chưa có token).

## Bước 2: Khởi tạo Chat System (Admin)

### 2.1 Đăng nhập Admin
1. Mở frontend: `http://localhost:5173`
2. Đăng nhập với tài khoản admin:
   - Email: `admin@res.com`
   - Password: `123456`

### 2.2 Khởi tạo Chat Participants
Sử dụng API tool (Postman/Thunder Client) hoặc browser console:

```javascript
// Trong browser console (F12)
fetch('/api/chat/initialize', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

Hoặc dùng Postman:
```
POST http://localhost:3000/api/chat/initialize
Authorization: Bearer <admin_token>
```

### 2.3 Kết quả mong đợi
```json
{
  "message": "Khởi tạo chat thành công",
  "participantCount": 5
}
```

## Bước 3: Test Chat System

### 3.1 Kiểm tra Chat Button
1. Refresh trang admin
2. Kiểm tra topbar có icon tin nhắn không
3. Nhấn vào icon để mở chat window

### 3.2 Test gửi tin nhắn
1. Nhập tin nhắn: "Hello everyone!"
2. Nhấn Enter hoặc nút Send
3. Tin nhắn sẽ hiển thị ngay lập tức

### 3.3 Test với nhiều user
1. Mở tab mới, đăng nhập với tài khoản khác:
   - Kế toán: `accountant@resident.test` / `123456`
   - Chủ hộ: `member@resident.test` / `123456`
2. Mở chat và gửi tin nhắn
3. Kiểm tra tin nhắn hiển thị ở tất cả các tab

## Bước 4: Kiểm tra tính năng

### 4.1 Danh sách người tham gia
1. Nhấn icon People trong chat header
2. Kiểm tra danh sách có đủ người không
3. Kiểm tra badge màu sắc theo vai trò

### 4.2 Reply tin nhắn
1. Nhấn icon Reply trên tin nhắn
2. Nhập nội dung reply
3. Gửi và kiểm tra hiển thị

### 4.3 Xóa tin nhắn
1. Nhấn icon Delete trên tin nhắn của mình
2. Kiểm tra tin nhắn chuyển thành "Tin nhắn đã được xóa"

## Bước 5: Troubleshooting

### 5.1 Chat button không hiển thị
**Nguyên nhân**: User không có quyền tham gia chat

**Giải pháp**:
1. Kiểm tra role của user
2. Chạy lại API initialize
3. Kiểm tra console errors

### 5.2 Lỗi 403 khi gửi tin nhắn
**Nguyên nhân**: User không có trong ChatParticipant

**Giải pháp**:
```javascript
// Kiểm tra participants
fetch('/api/chat/participants', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### 5.3 Tin nhắn không load
**Nguyên nhân**: Lỗi API hoặc populate

**Giải pháp**:
1. Kiểm tra network tab trong DevTools
2. Kiểm tra backend console có lỗi không
3. Restart backend server

### 5.4 Chat window không mở
**Nguyên nhân**: Lỗi import component

**Giải pháp**:
1. Kiểm tra file `frontend/src/components/Chat/ChatButton.jsx` tồn tại
2. Kiểm tra file `frontend/src/components/Chat/ChatWindow.jsx` tồn tại
3. Restart frontend server

## Bước 6: Kiểm tra Database

### 6.1 MongoDB Collections
Kiểm tra 2 collections mới được tạo:

```javascript
// Messages collection
db.messages.find().limit(5)

// ChatParticipants collection  
db.chatparticipants.find()
```

### 6.2 Sample Data
Messages collection sẽ có cấu trúc:
```json
{
  "_id": "...",
  "sender": "user_id",
  "content": "Hello everyone!",
  "messageType": "text",
  "isRead": [{"user": "user_id", "readAt": "..."}],
  "createdAt": "...",
  "updatedAt": "..."
}
```

ChatParticipants collection:
```json
{
  "_id": "...",
  "user": "user_id", 
  "role": "ADMIN",
  "isActive": true,
  "lastSeen": "...",
  "joinedAt": "..."
}
```

## Bước 7: Test Cases

### 7.1 Test cơ bản
- ✅ Admin có thể mở chat
- ✅ Kế toán có thể mở chat  
- ✅ Chủ hộ có thể mở chat
- ❌ Cư dân bình thường không thể mở chat

### 7.2 Test gửi tin nhắn
- ✅ Gửi tin nhắn text
- ✅ Tin nhắn hiển thị đúng người gửi
- ✅ Thời gian hiển thị chính xác
- ✅ Badge vai trò hiển thị đúng màu

### 7.3 Test reply
- ✅ Reply tin nhắn
- ✅ Hiển thị tin nhắn gốc trong reply
- ✅ Cancel reply

### 7.4 Test xóa
- ✅ Xóa tin nhắn của mình
- ✅ Admin xóa tin nhắn bất kỳ
- ❌ Không thể xóa tin nhắn người khác (trừ admin)

## Bước 8: Production Ready

### 8.1 Environment Variables
Thêm vào `.env`:
```
CHAT_ENABLED=true
MAX_MESSAGE_LENGTH=1000
CHAT_HISTORY_LIMIT=100
```

### 8.2 Rate Limiting
Thêm rate limiting cho chat endpoints:
```javascript
// Trong chatRoutes.js
import rateLimit from 'express-rate-limit';

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30 // 30 messages per minute
});

router.post("/messages", chatLimiter, sendMessage);
```

### 8.3 Validation
Thêm validation cho tin nhắn:
```javascript
// Trong chatController.js
if (content.length > 1000) {
  return res.status(400).json({ 
    message: "Tin nhắn quá dài (tối đa 1000 ký tự)" 
  });
}
```

## Kết quả cuối cùng

Sau khi hoàn thành tất cả bước:
- ✅ Chat button xuất hiện trên topbar
- ✅ Chat window mở ở góc dưới phải
- ✅ Gửi/nhận tin nhắn real-time
- ✅ Reply và xóa tin nhắn
- ✅ Phân quyền đúng theo vai trò
- ✅ Giao diện đẹp như Messenger

Hệ thống chat đã sẵn sàng sử dụng! 🚀