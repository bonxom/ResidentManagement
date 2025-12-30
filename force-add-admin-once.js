// Script chạy một lần để thêm admin vào chat
// Sau khi chạy thành công, xóa file này đi

import mongoose from 'mongoose';
import User from './backend/models/User.js';
import ChatParticipant from './backend/models/ChatParticipant.js';

async function forceAddAdmin() {
  try {
    console.log('🚀 Bắt đầu thêm admin vào chat...');
    
    // Kết nối database
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ev7nivw.mongodb.net/ResidentManagement');
    console.log('✅ Đã kết nối database');
    
    // Tìm user admin (thay email này bằng email admin thật của bạn)
    const adminEmails = [
      'admin@res.com',
      'admin@resident.test', 
      'hamlet.leader@resident.test'
    ];
    
    let adminFound = null;
    
    for (const email of adminEmails) {
      console.log(`🔍 Tìm admin với email: ${email}`);
      const admin = await User.findOne({ email: email }).populate('role');
      
      if (admin) {
        adminFound = admin;
        console.log(`✅ Tìm thấy admin: ${admin.name} (${admin.email}) - Role: ${admin.role?.role_name}`);
        break;
      }
    }
    
    if (!adminFound) {
      console.log('❌ Không tìm thấy admin nào!');
      console.log('📝 Hãy kiểm tra email admin trong database');
      
      // Liệt kê tất cả users để debug
      const allUsers = await User.find().populate('role').select('name email role');
      console.log('👥 Tất cả users trong database:');
      allUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - Role: ${user.role?.role_name}`);
      });
      
      return;
    }
    
    // Kiểm tra admin đã có trong chat chưa
    const existingParticipant = await ChatParticipant.findOne({ user: adminFound._id });
    
    if (existingParticipant) {
      console.log(`ℹ️ Admin ${adminFound.name} đã có trong chat`);
    } else {
      // Thêm admin vào chat
      await ChatParticipant.create({
        user: adminFound._id,
        role: 'ADMIN',
        isActive: true,
        joinedAt: new Date(),
        lastSeen: new Date(),
        notificationSettings: {
          enabled: true,
          sound: true,
          desktop: true
        }
      });
      
      console.log(`🎉 Đã thêm admin ${adminFound.name} vào chat thành công!`);
    }
    
    // Hiển thị tất cả participants
    const participants = await ChatParticipant.find().populate('user', 'name email');
    console.log(`👥 Danh sách participants hiện tại (${participants.length}):`);
    participants.forEach(p => {
      console.log(`   - ${p.user.name} (${p.user.email}) - Role: ${p.role}`);
    });
    
    console.log('🎉 Hoàn thành! Admin đã được thêm vào chat.');
    console.log('📝 Bây giờ bạn có thể xóa file force-add-admin-once.js này');
    
  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Chạy script
forceAddAdmin();