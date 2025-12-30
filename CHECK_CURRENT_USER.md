# 🔍 Kiểm tra tài khoản hiện tại

## Cách 1: Kiểm tra trong Browser Console

**Mở Console (F12) và chạy:**

```javascript
// Kiểm tra user hiện tại
const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
console.log('👤 User hiện tại:');
console.log('- Tên:', currentUser.name);
console.log('- Email:', currentUser.email);
console.log('- Role:', currentUser.role?.role_name);
console.log('- ID:', currentUser._id);

// Kiểm tra token
const token = localStorage.getItem('token');
console.log('🔑 Token exists:', !!token);

// Nếu không phải admin, đăng xuất và đăng nhập lại
if (currentUser.email !== 'admin@res.com') {
  console.log('⚠️ Bạn không phải admin!');
  console.log('📝 Hãy đăng xuất và đăng nhập với: admin@res.com / 123456');
}
```

## Cách 2: Kiểm tra trong giao diện

1. Nhìn vào góc trên phải của trang
2. Click vào icon Profile (User)
3. Xem thông tin user hiện tại
4. Nếu không phải admin → Đăng xuất và đăng nhập lại

## Nếu bạn đang đăng nhập đúng admin:

Có thể database bị lỗi. Hãy kiểm tra:

```javascript
// Kiểm tra thông tin admin trong database
fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('👤 Thông tin admin từ server:', data);
  if (data.name === 'Khá Văn Bịp') {
    console.log('⚠️ Tên admin trong database bị sai!');
    console.log('💡 Cần sửa tên admin trong database');
  }
});
```

## Cách sửa nếu tên admin bị sai:

### Cách 1: Sửa qua API
```javascript
// Cập nhật tên admin
fetch('/api/users/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Admin Tổ Trưởng' // Tên mới cho admin
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Đã cập nhật tên admin:', data);
  // Đăng xuất và đăng nhập lại để cập nhật
  localStorage.clear();
  window.location.reload();
});
```

### Cách 2: Sửa trực tiếp database
1. Mở MongoDB Compass
2. Tìm collection `users`
3. Tìm user với email `admin@res.com`
4. Sửa field `name` thành tên mong muốn
5. Save và refresh trang web

## Kết luận

**Khả năng cao nhất:** Bạn đang đăng nhập với tài khoản "Khá Văn Bịp" thay vì admin thật.

**Giải pháp:**
1. Đăng xuất khỏi tài khoản hiện tại
2. Đăng nhập với: `admin@res.com` / `123456`
3. Thử chat lại

**Nếu vẫn không được:** Tên admin trong database bị sai, cần sửa lại.