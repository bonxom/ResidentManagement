# 🏘️ Hệ thống Quản lý Dân cư

Hệ thống quản lý dân cư hiện đại, giúp quản lý thông tin hộ khẩu, nhân khẩu, thu phí và các yêu cầu từ cư dân một cách hiệu quả và minh bạch.

## 🔗 Links

- **🌐 Website**: [https://qldcfe.vercel.app/](https://qldcfe.vercel.app/)
- **🎥 Video Demo**: [https://www.youtube.com/watch?v=6cTSegFwFzA](https://www.youtube.com/watch?v=6cTSegFwFzA)

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🎯 Chức năng chính

### 👨‍💼 Quản trị viên (Admin)
- 👥 **Quản lý nhân khẩu**: Thêm, sửa, xóa, tìm kiếm thông tin cư dân
- 🏠 **Quản lý hộ khẩu**: Quản lý thông tin các hộ gia đình trong khu dân cư
- 💰 **Quản lý khoản phí**: Tạo và quản lý các loại phí (điện, nước, dịch vụ, phí bắt buộc...)
- 📊 **Thống kê**: Xem báo cáo thống kê về dân số, thu chi, công nợ
- 👔 **Phân quyền**: Quản lý vai trò và quyền hạn của người dùng
- 📝 **Quản lý yêu cầu**: Xem và xử lý các yêu cầu từ cư dân

### 💼 Kế toán (Accountant)
- 💵 **Quản lý giao dịch**: Ghi nhận và theo dõi các khoản thu chi
- 🧾 **Quản lý hóa đơn**: Tạo và quản lý hóa đơn cho từng hộ gia đình
- 📈 **Báo cáo tài chính**: Xem báo cáo thu chi, công nợ theo thời gian

### 🏡 Cư dân (User)
- 👀 **Xem thông tin**: Xem thông tin hộ khẩu, thành viên gia đình
- 💳 **Xem khoản phí**: Theo dõi các khoản phí cần đóng
- 📬 **Gửi yêu cầu**: Gửi yêu cầu, khiếu nại đến ban quản lý
- 💬 **Chat**: Liên hệ trực tiếp với ban quản lý
- 🔔 **Thông báo**: Nhận thông báo về phí, yêu cầu, thông báo chung

---

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- MongoDB
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone https://github.com/yourusername/ResidentManagement.git
cd ResidentManagement
```

### Bước 2: Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend` với nội dung:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
MONGO_DB_NAME=<database_name>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

Khởi chạy backend:
```bash
npm run dev
```

### Bước 3: Cài đặt Frontend

```bash
cd frontend
npm install
```

Tạo file `.env` trong thư mục `frontend` với nội dung:
```env
VITE_API_URL=http://localhost:5000/api
```

Khởi chạy frontend:
```bash
npm run dev
```

### Bước 4: Truy cập ứng dụng

Mở trình duyệt và truy cập: `http://localhost:5173`

---

## 👥 Thành viên nhóm

| Họ và Tên | Vai trò & Công việc |
|-----------|-------------------|
| **Hồ Minh Dũng** | Quản trị dự án, thiết kế database, xây dựng BE nhân khẩu, phân quyền, các trang FE, kết nối BE-FE |
| **Hoàng Tấn Phúc Múp** | Thiết kế database, xây dựng BE nhân khẩu thu phí, kết nối FE-BE |
| **Nguyễn Đức Bảo Minh** | Xây dựng các trang FE, làm video demo |
| **Nguyễn Mạnh Hùng** | Xây dựng các trang FE, xây dựng Chat, làm slide thuyết trình |
| **Phan Lê Duy Anh** | Xây dựng các trang FE, làm báo cáo dự án |

---

## 📝 License

This project is licensed under the MIT License.

---

## 📧 Liên hệ

Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ qua Issues của repository này.

---

**Dự án Nhập môn Công nghệ Phần mềm - 2025**
