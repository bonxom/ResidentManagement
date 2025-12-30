// Script đơn giản để thêm admin vào chat
console.log('🚀 Bắt đầu thêm admin vào chat...');

// Kết nối MongoDB và thêm admin
const { MongoClient, ObjectId } = require('mongodb');

async function addAdminToChat() {
  const client = new MongoClient('mongodb+srv://admin:admin@cluster0.ev7nivw.mongodb.net/ResidentManagement');
  
  try {
    await client.connect();
    console.log('✅ Đã kết nối MongoDB');
    
    const db = client.db('ResidentManagement');
    
    // Tìm admin
    const admin = await db.collection('users').findOne({ email: 'admin@res.com' });
    
    if (!admin) {
      console.log('❌ Không tìm thấy admin với email admin@res.com');
      
      // Liệt kê tất cả users
      const allUsers = await db.collection('users').find({}).toArray();
      console.log('👥 Tất cả users trong database:');
      allUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
      return;
    }
    
    console.log(`✅ Tìm thấy admin: ${admin.name} (${admin.email})`);
    
    // Kiểm tra admin đã có trong chat chưa
    const existing = await db.collection('chatparticipants').findOne({ user: admin._id });
    
    if (existing) {
      console.log('ℹ️ Admin đã có trong chat');
    } else {
      // Thêm admin vào chat
      await db.collection('chatparticipants').insertOne({
        user: admin._id,
        role: 'ADMIN',
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
      });
      
      console.log('🎉 Đã thêm admin vào chat thành công!');
    }
    
    // Hiển thị tất cả participants
    const participants = await db.collection('chatparticipants').find({}).toArray();
    console.log(`👥 Danh sách participants (${participants.length}):`);
    for (const p of participants) {
      const user = await db.collection('users').findOne({ _id: p.user });
      console.log(`   - ${user?.name} (${user?.email}) - Role: ${p.role}`);
    }
    
  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await client.close();
  }
}

addAdminToChat();