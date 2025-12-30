# 🚀 Manual Sync Guide - Thêm tất cả users vào chat

## Bước 1: Mở Browser và đăng nhập
1. Truy cập: `http://localhost:5174`
2. Đăng nhập admin: `admin@res.com` / `123456`

## Bước 2: Mở Console và chạy lệnh
**Nhấn F12 → Tab Console → Copy và paste lệnh này:**

```javascript
// === SCRIPT SYNC CHAT HOÀN CHỈNH ===
async function syncAllUsersToChat() {
  console.log('🔄 Bắt đầu sync tất cả users vào chat...');
  
  try {
    // Kiểm tra user hiện tại
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('👤 User hiện tại:', currentUser.name, '- Role:', currentUser.role?.role_name);
    
    if (currentUser.role?.role_name !== 'HAMLET LEADER') {
      alert('❌ Bạn cần đăng nhập với tài khoản admin!');
      return;
    }
    
    // Sync tất cả users
    console.log('🔄 Đang sync...');
    const syncResponse = await fetch('/api/chat/sync-all', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!syncResponse.ok) {
      const errorText = await syncResponse.text();
      throw new Error(`Sync failed: ${syncResponse.status} - ${errorText}`);
    }
    
    const syncData = await syncResponse.json();
    
    console.log('✅ Sync thành công!');
    console.log('📊 Kết quả:');
    console.log(`   - Đã thêm: ${syncData.addedCount} users`);
    console.log(`   - Tổng participants: ${syncData.totalParticipants}`);
    console.log(`   - Admin tìm thấy: ${syncData.details?.adminsFound || 'N/A'}`);
    console.log(`   - Kế toán tìm thấy: ${syncData.details?.accountantsFound || 'N/A'}`);
    console.log(`   - Hộ gia đình: ${syncData.details?.householdsFound || 'N/A'}`);
    
    // Kiểm tra participants
    console.log('🔍 Kiểm tra danh sách participants...');
    const participantsResponse = await fetch('/api/chat/participants', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (participantsResponse.ok) {
      const participants = await participantsResponse.json();
      console.log('👥 Danh sách participants hiện tại:');
      participants.forEach(p => {
        console.log(`   - ${p.user.name} (${p.user.email}) - Role: ${p.role}`);
      });
      
      // Kiểm tra admin có trong danh sách không
      const adminInChat = participants.find(p => p.user._id === currentUser._id);
      if (adminInChat) {
        console.log('✅ Admin đã có trong chat!');
      } else {
        console.log('⚠️ Admin chưa có trong chat, thử thêm riêng...');
        
        // Thêm admin vào chat
        const addAdminResponse = await fetch('/api/chat/add-me', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (addAdminResponse.ok) {
          const addResult = await addAdminResponse.json();
          console.log('✅ Đã thêm admin vào chat:', addResult.message);
        }
      }
    }
    
    // Hiển thị kết quả
    alert(`🎉 Sync hoàn thành!
    
✅ Đã thêm: ${syncData.addedCount} người vào chat
📊 Tổng cộng: ${syncData.totalParticipants} người trong chat
🔍 Admin: ${syncData.details?.adminsFound || 0} người
💼 Kế toán: ${syncData.details?.accountantsFound || 0} người  
🏠 Hộ gia đình: ${syncData.details?.householdsFound || 0} hộ

Chat system đã sẵn sàng! 🚀`);
    
    // Reload trang để cập nhật
    console.log('🔄 Đang reload trang...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Lỗi sync:', error);
    alert('❌ Có lỗi xảy ra: ' + error.message);
  }
}

// Chạy sync
syncAllUsersToChat();
```

## Bước 3: Chờ kết quả
- Script sẽ tự động sync tất cả users
- Hiển thị kết quả chi tiết
- Tự động reload trang sau 2 giây

## Bước 4: Kiểm tra chat
1. Sau khi reload, kiểm tra icon tin nhắn trên topbar
2. Click vào để mở chat
3. Click icon People để xem danh sách participants
4. Thử gửi tin nhắn test

## 🎯 Kết quả mong đợi

Sau khi chạy thành công:
- ✅ Tất cả Admin có trong chat với badge đỏ "Admin"
- ✅ Tất cả Kế toán có trong chat với badge xanh "Kế toán"  
- ✅ Tất cả Chủ hộ có trong chat với badge xanh lá "Chủ hộ"
- ❌ Thành viên hộ bình thường KHÔNG có trong chat

## 🔧 Nếu có lỗi

**Lỗi 403**: Đăng nhập lại với tài khoản admin
**Lỗi 401**: Token hết hạn, đăng xuất và đăng nhập lại
**Lỗi 500**: Kiểm tra backend console có lỗi gì

## 🎉 Hoàn thành!

Sau khi chạy script này, tất cả users có quyền sẽ được thêm vào chat và hệ thống sẽ hoạt động đầy đủ!

**Chat system đã sẵn sàng cho cộng đồng sử dụng!** 🚀