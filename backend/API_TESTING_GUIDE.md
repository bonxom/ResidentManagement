# 📚 Hướng Dẫn Test API - Resident Management System

## 🔗 Base URL
```
http://localhost:3000
```

## 📝 Lưu Ý Chung

### Headers
- **Content-Type**: `application/json`
- **Authorization**: `Bearer {token}` (cho các API cần xác thực)

### Cách Lấy Token
1. Gọi API `POST /auth/login` 
2. Lưu lại `token` từ response
3. Sử dụng trong header: `Authorization: Bearer {token}`

### Về Permissions
- Mỗi API được bảo vệ bởi permission cụ thể
- Nếu user không có permission, sẽ nhận lỗi 403 Forbidden
- User mới tạo có role `HOUSE MEMBER` với ít permissions

---

# 1️⃣ AUTHENTICATION APIs

## 1.1. Đăng Nhập (Login)

### Request
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Response Success (200)
```json
{
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGExMjM0NTY3ODkwYWJjZGVmMTIzNCIsImlhdCI6MTczMjg2NDAwMCwiZXhwIjoxNzM1NDU2MDAwfQ.xxxxx",
  "user": {
    "_id": "674a1234567890abcdef1234",
    "email": "admin@example.com",
    "name": "Admin",
    "userCardID": "079090000001",
    "sex": "Nam",
    "dob": "1985-01-01T00:00:00.000Z",
    "location": "TP.HCM",
    "phoneNumber": "0901234567",
    "role": {
      "_id": "674a9999567890abcdef9999",
      "role_name": "HAMLET LEADER",
      "permissions": [
        {
          "_id": "674a8888567890abcdef8888",
          "permission_name": "VIEW USER LIST"
        },
        {
          "_id": "674a8888567890abcdef8889",
          "permission_name": "CREATE USER"
        }
      ]
    }
  }
}
```

### Response Error (401)
```json
{
  "message": "Email hoặc mật khẩu không đúng"
}
```

### Response Error (400)
```json
{
  "message": "Vui lòng cung cấp email và mật khẩu"
}
```

---

## 1.2. Lấy Thông Tin User Hiện Tại

### Request
```http
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "_id": "674a1234567890abcdef1234",
  "email": "admin@example.com",
  "name": "Admin",
  "userCardID": "079090000001",
  "role": {
    "_id": "674a9999567890abcdef9999",
    "role_name": "HAMLET LEADER",
    "permissions": [...]
  },
  "permissions": [
    "VIEW USER LIST",
    "CREATE USER",
    "EDIT USER"
  ]
}
```

### Response Error (401)
```json
{
  "message": "Không tìm thấy token. Vui lòng đăng nhập."
}
```

---

# 2️⃣ USER APIs

## 2.1. Tạo User Mới (Đăng Ký)

**⚠️ Lưu ý**: API này không cần token, public access

### Request
```http
POST /users
Content-Type: application/json

{
  "email": "nguyen.vana@example.com",
  "password": "password123",
  "name": "Nguyễn Văn A",
  "sex": "Nam",
  "dob": "1990-05-15",
  "location": "123 Nguyễn Văn Linh, Q7, TP.HCM",
  "phoneNumber": "0901234567",
  "userCardID": "079090001234"
}
```

### Các Trường Bắt Buộc
- ✅ `email` (string, unique)
- ✅ `password` (string)
- ✅ `name` (string)
- ✅ `userCardID` (string, unique, CMND/CCCD)

### Các Trường Tùy Chọn
- `sex` (string): "Nam", "Nữ", "Khác"
- `dob` (date): Ngày sinh (YYYY-MM-DD)
- `location` (string): Địa chỉ
- `phoneNumber` (string): Số điện thoại

### Response Success (201)
```json
{
  "_id": "674a5678567890abcdef5678",
  "email": "nguyen.vana@example.com",
  "userCardID": "079090001234",
  "name": "Nguyễn Văn A",
  "role": "HOUSE MEMBER"
}
```

**📌 Note**: User mới sẽ tự động được gán vai trò `HOUSE MEMBER` (Cư dân)

### Response Error (400)
```json
{
  "message": "Email đã tồn tại"
}
```
hoặc
```json
{
  "message": "User card ID đã tồn tại"
}
```
hoặc
```json
{
  "message": "Thiếu userCardID"
}
```

---

## 2.2. Lấy Danh Sách Tất Cả Users

**🔒 Permission**: `VIEW USER LIST`

### Request
```http
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
[
  {
    "_id": "674a1234567890abcdef1234",
    "email": "admin@example.com",
    "name": "Admin",
    "userCardID": "079090000001",
    "sex": "Nam",
    "dob": "1985-01-01T00:00:00.000Z",
    "location": "TP.HCM",
    "phoneNumber": "0901234567",
    "role": {
      "_id": "674a9999567890abcdef9999",
      "role_name": "HAMLET LEADER",
      "description": "Tổ trưởng"
    },
    "createdAt": "2024-11-25T10:00:00.000Z",
    "updatedAt": "2024-11-25T10:00:00.000Z"
  },
  {
    "_id": "674a5678567890abcdef5678",
    "email": "nguyen.vana@example.com",
    "name": "Nguyễn Văn A",
    "userCardID": "079090001234",
    "role": {
      "_id": "674a9999567890abcdef9998",
      "role_name": "HOUSE MEMBER",
      "description": "Cư dân"
    }
  }
]
```

### Response Error (403)
```json
{
  "message": "Bạn không có quyền thực hiện hành động này.",
  "required": ["VIEW USER LIST"],
  "yourPermissions": ["VIEW USER"]
}
```

---

## 2.3. Lấy Thông Tin User Theo ID

**🔒 Permission**: `VIEW USER`

### Request
```http
GET /users/674a5678567890abcdef5678
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "_id": "674a5678567890abcdef5678",
  "email": "nguyen.vana@example.com",
  "name": "Nguyễn Văn A",
  "userCardID": "079090001234",
  "sex": "Nam",
  "dob": "1990-05-15T00:00:00.000Z",
  "location": "123 Nguyễn Văn Linh, Q7, TP.HCM",
  "phoneNumber": "0901234567",
  "role": {
    "_id": "674a9999567890abcdef9998",
    "role_name": "HOUSE MEMBER",
    "permissions": [...]
  },
  "createdAt": "2024-11-28T08:30:00.000Z",
  "updatedAt": "2024-11-28T08:30:00.000Z"
}
```

### Response Error (404)
```json
{
  "message": "Không tìm thấy người dùng"
}
```

---

## 2.4. Cập Nhật Thông Tin User

**🔒 Permission**: `EDIT USER`

### Request
```http
PUT /users/674a5678567890abcdef5678
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Nguyễn Văn A (Updated)",
  "sex": "Nam",
  "dob": "1990-05-15",
  "location": "456 Lê Văn Việt, Q9, TP.HCM",
  "phoneNumber": "0907654321",
  "roleName": "HAMLET LEADER"
}
```

### Các Trường Có Thể Cập Nhật
- `name` (string)
- `sex` (string)
- `dob` (date)
- `location` (string)
- `phoneNumber` (string)
- `roleName` (string) - **Lưu ý**: Dùng tên role (VD: "HAMLET LEADER"), không phải ID

**📌 Note**: 
- Tất cả các trường đều **optional**
- Chỉ cập nhật các trường được gửi lên
- Không thể cập nhật `email`, `password`, `userCardID` qua API này

### Response Success (200)
```json
{
  "_id": "674a5678567890abcdef5678",
  "email": "nguyen.vana@example.com",
  "name": "Nguyễn Văn A (Updated)",
  "userCardID": "079090001234",
  "sex": "Nam",
  "dob": "1990-05-15T00:00:00.000Z",
  "location": "456 Lê Văn Việt, Q9, TP.HCM",
  "phoneNumber": "0907654321",
  "role": "674a9999567890abcdef9999",
  "updatedAt": "2024-11-29T10:15:00.000Z"
}
```

### Response Error (400)
```json
{
  "message": "Vai trò cập nhật không hợp lệ"
}
```

---

## 2.5. Đổi Mật Khẩu User

**🔒 Permission**: `RESET USER PASSWORD`

### Request
```http
PATCH /users/674a5678567890abcdef5678/password
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}
```

### Các Trường Bắt Buộc
- ✅ `oldPassword` (string): Mật khẩu hiện tại
- ✅ `newPassword` (string): Mật khẩu mới

### Response Success (200)
```json
{
  "message": "Password changed successfully"
}
```

### Response Error (400)
```json
{
  "message": "Old password is incorrect"
}
```

### Response Error (404)
```json
{
  "message": "User not found"
}
```

---

## 2.6. Xóa User

**🔒 Permission**: `DELETE USER`

### Request
```http
DELETE /users/674a5678567890abcdef5678
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Deleted user"
}
```

### Response Error (400)
```json
{
  "message": "You cannot delete your own account"
}
```

### Response Error (404)
```json
{
  "message": "User not found"
}
```

**⚠️ Lưu ý**: Không thể xóa chính tài khoản đang đăng nhập

---

# 3️⃣ PERMISSION APIs

## 3.1. Tạo Permission Mới

**🔒 Permission**: `CREATE PERMISSION`

### Request
```http
POST /permissions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "permission_name": "VIEW REPORTS",
  "description": "Quyền xem báo cáo"
}
```

### Các Trường Bắt Buộc
- ✅ `permission_name` (string, unique, uppercase)

### Các Trường Tùy Chọn
- `description` (string): Mô tả quyền hạn

### Response Success (200)
```json
{
  "message": "Created permission",
  "permission": {
    "_id": "674a7777567890abcdef7777",
    "permission_name": "VIEW REPORTS",
    "description": "Quyền xem báo cáo",
    "createdAt": "2024-11-29T10:00:00.000Z",
    "updatedAt": "2024-11-29T10:00:00.000Z"
  }
}
```

### Response Error (400)
```json
{
  "message": "Permission name already exists"
}
```

---

## 3.2. Lấy Danh Sách Tất Cả Permissions

**🔒 Permission**: `VIEW PERMISSIONS`

### Request
```http
GET /permissions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Request success",
  "permissions": [
    {
      "_id": "674a8888567890abcdef8888",
      "permission_name": "VIEW USER LIST",
      "description": "Quyền xem danh sách người dùng",
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z"
    },
    {
      "_id": "674a8888567890abcdef8889",
      "permission_name": "CREATE USER",
      "description": "Quyền tạo người dùng mới",
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z"
    }
  ]
}
```

**📌 Note**: Kết quả được sắp xếp theo thời gian tạo (mới nhất trước)

---

## 3.3. Lấy Thông Tin Permission Theo ID

**🔒 Permission**: `VIEW PERMISSIONS`

### Request
```http
GET /permissions/674a7777567890abcdef7777
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Request success",
  "permission": {
    "_id": "674a7777567890abcdef7777",
    "permission_name": "VIEW REPORTS",
    "description": "Quyền xem báo cáo",
    "createdAt": "2024-11-29T10:00:00.000Z",
    "updatedAt": "2024-11-29T10:00:00.000Z"
  }
}
```

### Response Error (400)
```json
{
  "message": "Invalid permission ID"
}
```

---

## 3.4. Cập Nhật Permission

**🔒 Permission**: `EDIT PERMISSION`

### Request
```http
PUT /permissions/674a7777567890abcdef7777
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "permission_name": "VIEW ALL REPORTS",
  "description": "Quyền xem tất cả báo cáo hệ thống"
}
```

### Các Trường Có Thể Cập Nhật
- `permission_name` (string)
- `description` (string)

**📌 Note**: Tất cả các trường đều optional

### Response Success (200)
```json
{
  "message": "Updated permission",
  "permission": {
    "_id": "674a7777567890abcdef7777",
    "permission_name": "VIEW ALL REPORTS",
    "description": "Quyền xem tất cả báo cáo hệ thống",
    "updatedAt": "2024-11-29T11:00:00.000Z"
  }
}
```

### Response Error (400)
```json
{
  "message": "Permission name already exists"
}
```

---

## 3.5. Xóa Permission

**🔒 Permission**: `DELETE PERMISSION`

### Request
```http
DELETE /permissions/674a7777567890abcdef7777
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Deleted permission"
}
```

### Response Error (404)
```json
{
  "message": "Permission not found"
}
```

---

# 4️⃣ ROLE APIs

## 4.1. Tạo Role Mới

**🔒 Permission**: `CREATE ROLE`

### Request
```http
POST /roles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "role_name": "ACCOUNTANT",
  "permissions": ["VIEW USER LIST", "VIEW REPORTS", "EDIT USER"]
}
```

### Các Trường Bắt Buộc
- ✅ `role_name` (string, unique)

### Các Trường Tùy Chọn
- `permissions` (array of strings): Danh sách **tên** permissions (không phải ID)

### Response Success (200)
```json
{
  "message": "Created role",
  "role": {
    "_id": "674a6666567890abcdef6666",
    "role_name": "ACCOUNTANT",
    "permissions": [
      "674a8888567890abcdef8888",
      "674a7777567890abcdef7777",
      "674a8888567890abcdef8890"
    ],
    "createdAt": "2024-11-29T09:00:00.000Z",
    "updatedAt": "2024-11-29T09:00:00.000Z"
  }
}
```

**📌 Note**: 
- `permissions` là array của **permission_name** (VD: "VIEW USER LIST")
- Hệ thống sẽ tự động convert tên thành ID trong database
- Nếu permission không tồn tại, sẽ bị bỏ qua

### Response Error (400)
```json
{
  "message": "Role name already exists"
}
```

---

## 4.2. Lấy Danh Sách Tất Cả Roles

**🔒 Permission**: `VIEW ROLES`

### Request
```http
GET /roles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Request success",
  "roles": [
    {
      "_id": "674a9999567890abcdef9999",
      "role_name": "HAMLET LEADER",
      "permissions": [...],
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z"
    },
    {
      "_id": "674a6666567890abcdef6666",
      "role_name": "ACCOUNTANT",
      "permissions": [...],
      "createdAt": "2024-11-29T09:00:00.000Z",
      "updatedAt": "2024-11-29T09:00:00.000Z"
    }
  ]
}
```

**📌 Note**: Kết quả được sắp xếp theo thời gian tạo (mới nhất trước)

---

## 4.3. Lấy Thông Tin Role Theo ID

**🔒 Permission**: `VIEW ROLES`

### Request
```http
GET /roles/674a6666567890abcdef6666
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Request success",
  "role": {
    "_id": "674a6666567890abcdef6666",
    "role_name": "ACCOUNTANT",
    "permissions": [
      "674a8888567890abcdef8888",
      "674a7777567890abcdef7777"
    ],
    "createdAt": "2024-11-29T09:00:00.000Z",
    "updatedAt": "2024-11-29T09:00:00.000Z"
  }
}
```

### Response Error (400)
```json
{
  "message": "Invalid role ID"
}
```

---

## 4.4. Cập Nhật Role

**🔒 Permission**: `EDIT ROLE`

### Request
```http
PUT /roles/674a6666567890abcdef6666
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "role_name": "SENIOR ACCOUNTANT",
  "permissions": ["VIEW USER LIST", "VIEW REPORTS", "EDIT USER", "DELETE USER"]
}
```

### Các Trường Có Thể Cập Nhật
- `role_name` (string)
- `permissions` (array of strings): Danh sách **tên** permissions

**📌 Note**: 
- Tất cả các trường đều optional
- Khi update permissions, sẽ **thay thế toàn bộ** danh sách cũ

### Response Success (200)
```json
{
  "message": "Updated role",
  "role": {
    "_id": "674a6666567890abcdef6666",
    "role_name": "SENIOR ACCOUNTANT",
    "permissions": [...],
    "updatedAt": "2024-11-29T12:00:00.000Z"
  }
}
```

### Response Error (400)
```json
{
  "message": "Role name already exists"
}
```

---

## 4.5. Xóa Role

**🔒 Permission**: `DELETE ROLE`

### Request
```http
DELETE /roles/674a6666567890abcdef6666
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Deleted role"
}
```

### Response Error (404)
```json
{
  "message": "Role not found"
}
```

---

# 5️⃣ HOUSEHOLD APIs

## 5.1. Tạo Household Mới

**🔒 Permission**: `CREATE HOUSEHOLD`

### Request
```http
POST /households
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "houseHoldID": "HH001",
  "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
  "leaderId": "674a5678567890abcdef5678"
}
```

### Các Trường Bắt Buộc
- ✅ `houseHoldID` (string, unique): Mã hộ gia đình
- ✅ `address` (string): Địa chỉ
- ✅ `leaderId` (string): ID của user làm chủ hộ

### Response Success (201)
```json
{
  "_id": "674a3333567890abcdef3333",
  "houseHoldID": "HH001",
  "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
  "leader": "674a5678567890abcdef5678",
  "members": [
    "674a5678567890abcdef5678"
  ],
  "createdAt": "2024-11-29T08:00:00.000Z",
  "updatedAt": "2024-11-29T08:00:00.000Z"
}
```

**📌 Note**: 
- `leaderId` phải là ID của user hợp lệ trong database
- Leader sẽ **tự động được thêm** vào danh sách members

### Response Error (400)
```json
{
  "message": "Household ID already exists"
}
```

### Response Error (404)
```json
{
  "message": "Leader user not found"
}
```

---

## 5.2. Lấy Danh Sách Tất Cả Households

**🔒 Permission**: `VIEW HOUSEHOLD LIST`

### Request
```http
GET /households
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
[
  {
    "_id": "674a3333567890abcdef3333",
    "houseHoldID": "HH001",
    "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
    "leader": {
      "_id": "674a5678567890abcdef5678",
      "name": "Nguyễn Văn A",
      "email": "nguyen.vana@example.com"
    },
    "members": [
      {
        "_id": "674a5678567890abcdef5678",
        "name": "Nguyễn Văn A",
        "email": "nguyen.vana@example.com"
      },
      {
        "_id": "674a5678567890abcdef5679",
        "name": "Nguyễn Thị B",
        "email": "nguyen.thib@example.com"
      }
    ],
    "createdAt": "2024-11-29T08:00:00.000Z",
    "updatedAt": "2024-11-29T08:00:00.000Z"
  }
]
```

**📌 Note**: Leader và members được populate với thông tin cơ bản (name, email)

---

## 5.3. Lấy Thông Tin Household Theo ID

**🔒 Permission**: `VIEW HOUSEHOLD`

### Request
```http
GET /households/674a3333567890abcdef3333
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "_id": "674a3333567890abcdef3333",
  "houseHoldID": "HH001",
  "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
  "leader": {
    "_id": "674a5678567890abcdef5678",
    "name": "Nguyễn Văn A",
    "email": "nguyen.vana@example.com"
  },
  "members": [...],
  "createdAt": "2024-11-29T08:00:00.000Z",
  "updatedAt": "2024-11-29T08:00:00.000Z"
}
```

### Response Error (404)
```json
{
  "message": "Household not found"
}
```

---

## 5.4. Cập Nhật Household

**🔒 Permission**: `EDIT HOUSEHOLD`

### Request
```http
PUT /households/674a3333567890abcdef3333
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "houseHoldID": "HH001-UPDATED",
  "address": "456 Lê Văn Việt, Phường Hiệp Phú, Quận 9, TP.HCM",
  "leaderId": "674a5678567890abcdef5679"
}
```

### Các Trường Có Thể Cập Nhật
- `houseHoldID` (string)
- `address` (string)
- `leaderId` (string): ID của user mới làm chủ hộ

**📌 Note**: 
- Tất cả các trường đều optional
- Khi đổi `leaderId`, leader mới sẽ **tự động được thêm** vào danh sách members

### Response Success (200)
```json
{
  "_id": "674a3333567890abcdef3333",
  "houseHoldID": "HH001-UPDATED",
  "address": "456 Lê Văn Việt, Phường Hiệp Phú, Quận 9, TP.HCM",
  "leader": "674a5678567890abcdef5679",
  "members": [...],
  "updatedAt": "2024-11-29T13:00:00.000Z"
}
```

### Response Error (404)
```json
{
  "message": "New leader not found"
}
```

---

## 5.5. Xóa Household

**🔒 Permission**: `DELETE HOUSEHOLD`

### Request
```http
DELETE /households/674a3333567890abcdef3333
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
{
  "message": "Household deleted"
}
```

### Response Error (404)
```json
{
  "message": "Household not found"
}
```

---

## 5.6. Lấy Danh Sách Thành Viên Của Household

**🔒 Permission**: `VIEW HOUSEHOLD`

### Request
```http
GET /households/674a3333567890abcdef3333/members
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Success (200)
```json
[
  {
    "_id": "674a5678567890abcdef5678",
    "name": "Nguyễn Văn A",
    "email": "nguyen.vana@example.com"
  },
  {
    "_id": "674a5678567890abcdef5679",
    "name": "Nguyễn Thị B",
    "email": "nguyen.thib@example.com"
  },
  {
    "_id": "674a5678567890abcdef5680",
    "name": "Nguyễn Văn C",
    "email": "nguyen.vanc@example.com"
  }
]
```

### Response Error (404)
```json
{
  "message": "Household not found"
}
```

---

## 5.7. Thêm Thành Viên Vào Household

**🔒 Permission**: `EDIT HOUSEHOLD`

### Request
```http
POST /households/674a3333567890abcdef3333/members
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "userId": "674a5678567890abcdef5680"
}
```

### Các Trường Bắt Buộc
- ✅ `userId` (string): ID của user cần thêm vào household

### Response Success (200)
```json
{
  "_id": "674a3333567890abcdef3333",
  "houseHoldID": "HH001",
  "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
  "leader": "674a5678567890abcdef5678",
  "members": [
    "674a5678567890abcdef5678",
    "674a5678567890abcdef5679",
    "674a5678567890abcdef5680"
  ],
  "updatedAt": "2024-11-29T14:00:00.000Z"
}
```

### Response Error (404)
```json
{
  "message": "User not found"
}
```

### Response Error (400)
```json
{
  "message": "User is already a household member"
}
```

---

## 5.8. Xóa Thành Viên Khỏi Household

**🔒 Permission**: `EDIT HOUSEHOLD`

### Request
```http
DELETE /households/674a3333567890abcdef3333/members/674a5678567890abcdef5680
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### URL Parameters
- `householdId`: ID của household
- `memberId`: ID của member cần xóa

### Response Success (200)
```json
{
  "_id": "674a3333567890abcdef3333",
  "houseHoldID": "HH001",
  "address": "123 Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
  "leader": "674a5678567890abcdef5678",
  "members": [
    "674a5678567890abcdef5678",
    "674a5678567890abcdef5679"
  ],
  "updatedAt": "2024-11-29T15:00:00.000Z"
}
```

### Response Error (400)
```json
{
  "message": "Cannot remove the household leader. Please assign a new leader first."
}
```

**⚠️ Lưu ý**: 
- Không thể xóa leader khỏi household
- Muốn xóa leader, phải đổi leader trước (qua API Update Household)

---

# 6️⃣ ERROR RESPONSES

## 401 Unauthorized - Chưa Xác Thực

### Không Có Token
```json
{
  "message": "Không tìm thấy token. Vui lòng đăng nhập."
}
```

### Token Không Hợp Lệ
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn."
}
```

### User Không Tồn Tại
```json
{
  "message": "Không tìm thấy người dùng tương ứng với token."
}
```

---

## 403 Forbidden - Không Có Quyền

### Thiếu Permission
```json
{
  "message": "Bạn không có quyền thực hiện hành động này.",
  "required": ["VIEW USER LIST"],
  "yourPermissions": [
    "VIEW USER",
    "EDIT USER"
  ]
}
```

### Thiếu Role
```json
{
  "message": "Vai trò \"HOUSE MEMBER\" không có quyền thực hiện hành động này"
}
```

---

## 400 Bad Request - Dữ Liệu Không Hợp Lệ

### Email Đã Tồn Tại
```json
{
  "message": "Email đã tồn tại"
}
```

### User Card ID Đã Tồn Tại
```json
{
  "message": "User card ID đã tồn tại"
}
```

### Thiếu Trường Bắt Buộc
```json
{
  "message": "Thiếu userCardID"
}
```

### Invalid ID Format
```json
{
  "message": "Invalid user ID"
}
```

### Permission/Role Name Đã Tồn Tại
```json
{
  "message": "Permission name already exists"
}
```

### Mật Khẩu Cũ Sai
```json
{
  "message": "Old password is incorrect"
}
```

---

## 404 Not Found - Không Tìm Thấy

### User Not Found
```json
{
  "message": "User not found"
}
```

### Permission Not Found
```json
{
  "message": "Permission not found"
}
```

### Role Not Found
```json
{
  "message": "Role not found"
}
```

### Household Not Found
```json
{
  "message": "Household not found"
}
```

---

## 500 Internal Server Error

### Lỗi Hệ Thống
```json
{
  "message": "Lỗi: Không tìm thấy vai trò mặc định."
}
```

### Lỗi Database
```json
{
  "message": "Database connection error"
}
```

---

# 7️⃣ TESTING WORKFLOW

## Bước 1: Khởi Tạo Dữ Liệu Ban Đầu

### 1.1. Tạo Permissions
```bash
# Tạo các permissions cơ bản
POST /permissions
{
  "permission_name": "VIEW USER LIST",
  "description": "Xem danh sách người dùng"
}

POST /permissions
{
  "permission_name": "CREATE USER",
  "description": "Tạo người dùng mới"
}

POST /permissions
{
  "permission_name": "EDIT USER",
  "description": "Chỉnh sửa thông tin người dùng"
}

POST /permissions
{
  "permission_name": "DELETE USER",
  "description": "Xóa người dùng"
}

# ... tạo thêm các permissions khác
```

### 1.2. Tạo Roles
```bash
# Tạo role HAMLET LEADER với full permissions
POST /roles
{
  "role_name": "HAMLET LEADER",
  "permissions": [
    "VIEW USER LIST",
    "CREATE USER",
    "EDIT USER",
    "DELETE USER",
    "VIEW PERMISSIONS",
    "CREATE PERMISSION",
    "EDIT PERMISSION",
    "DELETE PERMISSION",
    "VIEW ROLES",
    "CREATE ROLE",
    "EDIT ROLE",
    "DELETE ROLE",
    "VIEW HOUSEHOLD LIST",
    "CREATE HOUSEHOLD",
    "VIEW HOUSEHOLD",
    "EDIT HOUSEHOLD",
    "DELETE HOUSEHOLD"
  ]
}

# Tạo role HOUSE MEMBER với ít permissions
POST /roles
{
  "role_name": "HOUSE MEMBER",
  "permissions": [
    "VIEW USER",
    "VIEW HOUSEHOLD"
  ]
}
```

---

## Bước 2: Tạo Admin User

```bash
POST /users
{
  "email": "admin@example.com",
  "password": "admin123",
  "name": "Admin",
  "userCardID": "079090000001",
  "sex": "Nam",
  "phoneNumber": "0901234567"
}

# User này sẽ có role HOUSE MEMBER mặc định
# Sau đó cần update role thành HAMLET LEADER
```

---

## Bước 3: Cập Nhật Role Cho Admin

```bash
# Đăng nhập bằng admin account khác (nếu có)
# Hoặc dùng database tool để update trực tiếp

PUT /users/{admin_user_id}
{
  "roleName": "HAMLET LEADER"
}
```

---

## Bước 4: Test Authentication

```bash
# Login
POST /auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}

# Lưu token từ response

# Get current user info
GET /auth/me
Authorization: Bearer {token}
```

---

## Bước 5: Test CRUD Operations

### Test Users
```bash
# Create
POST /users {...}

# Read All
GET /users

# Read One
GET /users/{id}

# Update
PUT /users/{id} {...}

# Change Password
PATCH /users/{id}/password {...}

# Delete
DELETE /users/{id}
```

### Test Permissions
```bash
# Tương tự cho permissions
GET /permissions
POST /permissions {...}
PUT /permissions/{id} {...}
DELETE /permissions/{id}
```

### Test Roles
```bash
# Tương tự cho roles
GET /roles
POST /roles {...}
PUT /roles/{id} {...}
DELETE /roles/{id}
```

### Test Households
```bash
# Create household
POST /households {...}

# Get all households
GET /households

# Add member
POST /households/{id}/members {...}

# Get members
GET /households/{id}/members

# Remove member
DELETE /households/{householdId}/members/{memberId}

# Delete household
DELETE /households/{id}
```

---

## Bước 6: Test Permission System

### Tạo User Với Quyền Hạn Hạn Chế
```bash
# Tạo user mới (sẽ có role HOUSE MEMBER)
POST /users
{
  "email": "member@example.com",
  "password": "member123",
  "name": "Member User",
  "userCardID": "079090002222"
}

# Login với user này
POST /auth/login
{
  "email": "member@example.com",
  "password": "member123"
}

# Thử gọi API cần permission cao
GET /users
# Expect: 403 Forbidden
```

### Test Permission Denied
```bash
# Với token của member user
DELETE /users/{some_id}
# Expect: 403 Forbidden with message về permission
```

---

# 8️⃣ POSTMAN/THUNDER CLIENT COLLECTION

## Environment Variables
```
base_url = http://localhost:3000
token = (sẽ được set sau khi login)
admin_id = (ID của admin user)
test_user_id = (ID của test user)
test_household_id = (ID của test household)
```

## Collection Structure
```
📁 Resident Management API
  📁 1. Authentication
    ├─ POST Login
    └─ GET Get Me
  
  📁 2. Users
    ├─ POST Create User
    ├─ GET Get All Users
    ├─ GET Get User By ID
    ├─ PUT Update User
    ├─ PATCH Change Password
    └─ DELETE Delete User
  
  📁 3. Permissions
    ├─ POST Create Permission
    ├─ GET Get All Permissions
    ├─ GET Get Permission By ID
    ├─ PUT Update Permission
    └─ DELETE Delete Permission
  
  📁 4. Roles
    ├─ POST Create Role
    ├─ GET Get All Roles
    ├─ GET Get Role By ID
    ├─ PUT Update Role
    └─ DELETE Delete Role
  
  📁 5. Households
    ├─ POST Create Household
    ├─ GET Get All Households
    ├─ GET Get Household By ID
    ├─ PUT Update Household
    ├─ DELETE Delete Household
    ├─ GET Get Household Members
    ├─ POST Add Member
    └─ DELETE Remove Member
```

---

# 9️⃣ TIPS & BEST PRACTICES

## Security
- ✅ Luôn dùng HTTPS trong production
- ✅ Token có thời gian hết hạn (check trong `generateToken.js`)
- ✅ Không share token công khai
- ✅ Hash password trước khi lưu DB (đã implement trong User model)

## Permission Management
- ✅ Permission name nên viết UPPERCASE và rõ ràng
- ✅ Tạo permissions trước khi tạo roles
- ✅ Gán role phù hợp cho từng user
- ✅ Review permissions định kỳ

## Household Management
- ✅ Leader phải là user hợp lệ
- ✅ Không thể xóa leader trực tiếp
- ✅ Muốn đổi leader, dùng API Update Household
- ✅ Member có thể thuộc nhiều households (tùy logic nghiệp vụ)

## Error Handling
- ✅ Luôn check response status code
- ✅ Đọc message để hiểu lỗi
- ✅ Log errors để debug
- ✅ Handle token expiration gracefully

## Testing
- ✅ Test theo workflow (Auth -> Permissions -> Roles -> Users -> Households)
- ✅ Test cả success và error cases
- ✅ Test với nhiều roles khác nhau
- ✅ Verify permissions hoạt động đúng

---

# 🔟 QUICK REFERENCE

## Common Status Codes
| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Request thành công |
| 201 | Created | Tạo resource thành công |
| 400 | Bad Request | Dữ liệu không hợp lệ |
| 401 | Unauthorized | Chưa đăng nhập hoặc token invalid |
| 403 | Forbidden | Không có quyền truy cập |
| 404 | Not Found | Không tìm thấy resource |
| 500 | Internal Server Error | Lỗi server |

## Required Headers
```
Content-Type: application/json
Authorization: Bearer {token}  // cho APIs cần auth
```

## Permission List (Common)
```
VIEW USER LIST
VIEW USER
CREATE USER
EDIT USER
DELETE USER
RESET USER PASSWORD

VIEW PERMISSIONS
CREATE PERMISSION
EDIT PERMISSION
DELETE PERMISSION

VIEW ROLES
CREATE ROLE
EDIT ROLE
DELETE ROLE

VIEW HOUSEHOLD LIST
VIEW HOUSEHOLD
CREATE HOUSEHOLD
EDIT HOUSEHOLD
DELETE HOUSEHOLD
```

## Default Roles
```
HAMLET LEADER    - Tổ trưởng (full permissions)
HOUSE MEMBER     - Cư dân (limited permissions)
ACCOUNTANT       - Kế toán (custom permissions)
```

---

**📅 Last Updated**: November 29, 2025  
**🔖 Version**: 1.0.0  
**👨‍💻 Author**: Resident Management Team
