// Script để sync tất cả users vào chat
const fetch = require('node-fetch');

async function syncChatUsers() {
  try {
    console.log('🔄 Starting chat sync...');
    
    // Đầu tiên cần login để lấy token
    console.log('🔐 Logging in as admin...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@res.com',
        password: '123456'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    
    console.log('✅ Login successful');
    
    // Sync tất cả users vào chat
    console.log('🔄 Syncing all users to chat...');
    const syncResponse = await fetch('http://localhost:3000/api/chat/sync-all', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!syncResponse.ok) {
      const errorText = await syncResponse.text();
      throw new Error(`Sync failed: ${syncResponse.status} - ${errorText}`);
    }
    
    const syncData = await syncResponse.json();
    
    console.log('✅ Sync completed successfully!');
    console.log('📊 Results:');
    console.log(`   - Added: ${syncData.addedCount} users`);
    console.log(`   - Total participants: ${syncData.totalParticipants}`);
    console.log(`   - Admins found: ${syncData.details?.adminsFound || 'N/A'}`);
    console.log(`   - Accountants found: ${syncData.details?.accountantsFound || 'N/A'}`);
    console.log(`   - Households found: ${syncData.details?.householdsFound || 'N/A'}`);
    
    // Kiểm tra participants
    console.log('🔍 Checking participants...');
    const participantsResponse = await fetch('http://localhost:3000/api/chat/participants', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (participantsResponse.ok) {
      const participants = await participantsResponse.json();
      console.log('👥 Current participants:');
      participants.forEach(p => {
        console.log(`   - ${p.user.name} (${p.user.email}) - Role: ${p.role}`);
      });
    }
    
    console.log('🎉 Chat sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Chạy sync
syncChatUsers();