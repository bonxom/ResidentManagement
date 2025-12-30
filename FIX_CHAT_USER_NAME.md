# 🔧 Sửa lỗi hiển thị tên trong chat

## Vấn đề hiện tại:
- Bạn đăng nhập với email `tutruong@gmail.com` (tên: "Tào Mạnh Đức")
- Nhưng muốn hiển thị tên khác trong chat

## Giải pháp:

### Cách 1: Sửa tên user trong database

**Chạy lệnh này trong browser console:**

```javascript
// Kiểm tra user hiện tại
const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
console.log('👤 User hiện tại:', currentUser);

// Sửa tên user
fetch('http://localhost:3000/api/chat/fix-user-name', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: currentUser.email, // Email hiện tại
    newName: 'Khá Văn Bịp'    // Tên mới muốn hiển thị
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Kết quả:', data);
  if (data.success) {
    alert('Đã sửa tên thành công! Đăng xuất và đăng nhập lại để thấy thay đổi.');
    // Đăng xuất để cập nhật thông tin
    localStorage.clear();
    window.location.reload();
  }
});
```

### Cách 2: Đăng nhập đúng tài khoản

Nếu bạn muốn dùng tài khoản "Khá Văn Bịp":
1. Đăng xuất khỏi tài khoản hiện tại
2. Đăng nhập với: `khabipnurmagomedov@gmail.com` / `password_cua_kha_van_bip`

### Cách 3: Tạo tài khoản mới

```javascript
// Tạo user mới với tên mong muốn
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'khabip.new@gmail.com',
    password: '123456',
    name: 'Khá Văn Bịp',
    userCardID: '123456789',
    // ... thông tin khác
  })
})
.then(res => res.json())
.then(data => {
  console.log('Tạo user mới:', data);
});
```

## Real-time Chat đã được thêm:

✅ **Auto-refresh**: Tin nhắn tự động cập nhật mỗi 2 giây
✅ **Instant display**: Tin nhắn hiển thị ngay khi gửi
✅ **Cross-user sync**: Tất cả users sẽ thấy tin nhắn mới

## Test Real-time:

1. Mở 2 tab browser
2. Đăng nhập 2 tài khoản khác nhau
3. Gửi tin nhắn ở tab 1
4. Kiểm tra tin nhắn xuất hiện ở tab 2 sau 2 giây

## Debug thông tin:

Mở Console (F12) khi chat để xem:
- Thông tin user hiện tại
- Log khi gửi tin nhắn
- Lỗi nếu có

**Sau khi sửa tên, tất cả tin nhắn sẽ hiển thị đúng tên người gửi!** 🚀