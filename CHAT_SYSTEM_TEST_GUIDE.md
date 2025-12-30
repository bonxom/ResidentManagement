# Chat System Test Guide

## ✅ System Status
- **Backend**: Running on http://localhost:3000
- **Frontend**: Running on http://localhost:5174
- **Chat Routes**: Registered at `/api/chat/*`
- **Components**: ChatButton and ChatWindow integrated in Topbar

## 🧪 Test Steps

### Step 1: Access the Application
1. Open browser and go to: `http://localhost:5174`
2. You should see the login page

### Step 2: Login as Admin
1. Use admin credentials:
   - Email: `admin@res.com`
   - Password: `123456`
2. After login, check the topbar for the message icon (blue button)

### Step 3: Initialize Chat System (First Time Only)
1. Open browser console (F12)
2. Run this command to initialize chat participants:
```javascript
fetch('/api/chat/initialize', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log('Chat initialized:', data));
```

### Step 4: Test Chat Button
1. Click the message icon in the topbar
2. Chat window should open in bottom-right corner
3. Window should show "Chat Cộng Đồng" title

### Step 5: Test Participants List
1. Click the People icon in chat header
2. Should show list of participants with roles:
   - Admin (red badge)
   - Kế toán (blue badge) 
   - Chủ hộ (green badge)

### Step 6: Test Sending Messages
1. Type a message: "Hello everyone!"
2. Press Enter or click Send button
3. Message should appear immediately
4. Check message shows correct sender name and role badge

### Step 7: Test Reply Feature
1. Click Reply icon on any message
2. Type reply message
3. Send reply
4. Should show original message in reply box

### Step 8: Test Delete Feature
1. Click Delete icon on your own message
2. Message should change to "Tin nhắn đã được xóa"

### Step 9: Test Multi-User (Optional)
1. Open new incognito tab
2. Login with different account:
   - Accountant: `accountant@resident.test` / `123456`
   - Household Leader: `member@resident.test` / `123456`
3. Open chat and send messages
4. Check messages appear in both tabs

## 🔍 Expected Results

### ✅ Chat Button
- Blue message icon visible in topbar
- Badge shows unread count when chat is closed
- Tooltip shows "Tin nhắn"

### ✅ Chat Window
- Opens in bottom-right corner
- Shows participant count in header
- Messenger-like interface
- Smooth scrolling to new messages

### ✅ Messages
- Show sender name and role badge
- Correct timestamp formatting
- Own messages on right (blue)
- Others' messages on left (white)

### ✅ Participants
- Admin: Red badge "Admin"
- Accountant: Blue badge "Kế toán"
- Household Leader: Green badge "Chủ hộ"
- No regular residents in list

### ✅ Features
- Reply with original message preview
- Delete own messages (Admin can delete any)
- Real-time message updates
- Auto-scroll to bottom

## 🚨 Troubleshooting

### Chat Button Not Visible
**Cause**: User role not allowed in chat
**Solution**: Check user role, only Admin/Accountant/Household Leaders can see chat

### Error 403 on Initialize
**Cause**: Not logged in as admin
**Solution**: Login with admin account first

### Messages Not Loading
**Cause**: Backend not running or database connection issue
**Solution**: Check backend console for errors, restart if needed

### Chat Window Not Opening
**Cause**: Component import error
**Solution**: Check browser console for JavaScript errors

## 📊 API Endpoints

Test these endpoints manually if needed:

```bash
# Get participants (requires auth token)
GET http://localhost:3000/api/chat/participants

# Get messages
GET http://localhost:3000/api/chat/messages

# Send message
POST http://localhost:3000/api/chat/messages
{
  "content": "Test message",
  "replyTo": null
}

# Initialize chat (admin only)
POST http://localhost:3000/api/chat/initialize
```

## 🎯 Success Criteria

The chat system is working correctly if:
- ✅ Chat button appears for authorized users
- ✅ Chat window opens and closes smoothly
- ✅ Messages send and receive in real-time
- ✅ Participants list shows correct roles
- ✅ Reply and delete functions work
- ✅ Only Admin/Accountant/Household Leaders can access
- ✅ UI matches Messenger-like design

## 🚀 Next Steps

After successful testing:
1. The chat system is ready for production use
2. Users can communicate in real-time
3. Admin can manage the community chat
4. System supports role-based access control

**Chat system implementation is complete!** 🎉