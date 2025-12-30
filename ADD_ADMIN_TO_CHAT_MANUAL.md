# 🔧 Thêm Admin vào Chat - Cách thủ công

## Cách 1: Truy cập MongoDB trực tiếp

### Bước 1: Mở MongoDB Compass hoặc MongoDB Shell
1. Mở MongoDB Compass
2. Kết nối đến database: `mongodb://localhost:27017/ResidentManagement`
3. Hoặc dùng MongoDB Shell: `mongosh "mongodb://localhost:27017/ResidentManagement"`

### Bước 2: Tìm ID của admin
```javascript
// Tìm admin trong collection users
db.users.find({"email": "admin@res.com"}).pretty()

// Hoặc tìm tất cả admin
db.users.find().populate("role").where("role.role_name").equals("HAMLET LEADER")

// Copy ObjectId của admin (ví dụ: 507f1f77bcf86cd799439011)
```

### Bước 3: Thêm admin vào chat
```javascript
// Thêm admin vào collection chatparticipants
db.chatparticipants.insertOne({
  user: ObjectId("507f1f77bcf86cd799439011"), // Thay bằng ID thực của admin
  role: "ADMIN",
  isActive: true,
  joinedAt: new Date(),
  lastSeen: new Date(),
  notificationSettings: {
    enabled: true,
    sound: true,
    desktop: true
  },
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Bước 4: Kiểm tra kết quả
```javascript
// Kiểm tra admin đã có trong chat chưa
db.chatparticipants.find().pretty()
```

## Cách 2: Tạo script Node.js đơn giản

### Tạo file add-admin-to-chat.js:
```javascript
import mongoose from 'mongoose';
import User from './backend/models/User.js';
import ChatParticipant from './backend/models/ChatParticipant.js';

// Kết nối database
await mongoose.connect('mongodb://localhost:27017/ResidentManagement');

try {
  // Tìm admin
  const admin = await User.findOne({ email: 'admin@res.com' }).populate('role');
  
  if (!admin) {
    console.log('❌ Không tìm thấy admin');
    process.exit(1);
  }
  
  console.log('✅ Tìm thấy admin:', admin.name, admin.email);
  
  // Kiểm tra admin đã có trong chat chưa
  const existingParticipant = await ChatParticipant.findOne({ user: admin._id });
  
  if (existingParticipant) {
    console.log('ℹ️ Admin đã có trong chat');
  } else {
    // Thêm admin vào chat
    await ChatParticipant.create({
      user: admin._id,
      role: 'ADMIN',
      isActive: true,
      joinedAt: new Date(),
      lastSeen: new Date()
    });
    
    console.log('🎉 Đã thêm admin vào chat thành công!');
  }
  
  // Hiển thị tất cả participants
  const participants = await ChatParticipant.find().populate('user', 'name email');
  console.log('👥 Danh sách participants hiện tại:');
  participants.forEach(p => {
    console.log(`   - ${p.user.name} (${p.user.email}) - Role: ${p.role}`);
  });
  
} catch (error) {
  console.error('❌ Lỗi:', error);
} finally {
  await mongoose.disconnect();
  process.exit(0);
}
```

### Chạy script:
```bash
cd backend
node ../add-admin-to-chat.js
```

## Cách 3: Sử dụng API endpoint đơn giản

### Tạo endpoint không cần auth trong chatRoutes.js:
```javascript
// Thêm vào đầu file chatRoutes.js (trước router.use(protect))
router.post("/manual-add-admin", async (req, res) => {
  try {
    const admin = await User.findOne({ email: 'admin@res.com' }).populate('role');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin không tồn tại' });
    }
    
    const existingParticipant = await ChatParticipant.findOne({ user: admin._id });
    
    if (existingParticipant) {
      return res.status(200).json({ 
        message: 'Admin đã có trong chat',
        participant: existingParticipant 
      });
    }
    
    const newParticipant = await ChatParticipant.create({
      user: admin._id,
      role: 'ADMIN',
      isActive: true,
      joinedAt: new Date()
    });
    
    res.status(201).json({ 
      message: 'Đã thêm admin vào chat thành công!',
      participant: newParticipant 
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

### Sau đó gọi API:
```bash
curl -X POST http://localhost:3000/api/chat/manual-add-admin
```

## Cách 4: Sử dụng MongoDB Compass GUI

### Bước 1: Mở MongoDB Compass
1. Kết nối đến database
2. Chọn collection `users`
3. Tìm admin với email `admin@res.com`
4. Copy ObjectId của admin

### Bước 2: Thêm vào collection chatparticipants
1. Chọn collection `chatparticipants`
2. Click "Insert Document"
3. Paste JSON này (thay ObjectId):

```json
{
  "user": ObjectId("ADMIN_ID_HERE"),
  "role": "ADMIN",
  "isActive": true,
  "joinedAt": ISODate(),
  "lastSeen": ISODate(),
  "notificationSettings": {
    "enabled": true,
    "sound": true,
    "desktop": true
  },
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

## Cách 5: Tạm thời sửa ChatButton để không check quyền

### Sửa ChatButton.jsx:
```javascript
// Tạm thời comment out check quyền
// if (!hasAccess) {
//   return null;
// }

// Luôn hiển thị chat button
return (
  <>
    <Tooltip title="Tin nhắn">
      <IconButton onClick={handleToggle}>
        <MessageIcon />
      </IconButton>
    </Tooltip>
    <ChatWindow open={open} onClose={() => setOpen(false)} />
  </>
);
```

## Khuyến nghị

**Cách nhanh nhất:** Sử dụng MongoDB Compass (Cách 4)
1. Mở MongoDB Compass
2. Tìm admin ID trong collection `users`
3. Thêm document mới vào collection `chatparticipants`
4. Refresh trang web và thử chat

**Cách an toàn nhất:** Tạo script Node.js (Cách 2)
- Đảm bảo không có lỗi
- Có thể chạy lại nhiều lần
- Tự động kiểm tra duplicate

Bạn muốn thử cách nào? Tôi có thể hướng dẫn chi tiết hơn! 🚀