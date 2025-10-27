import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
// Import các middleware
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Định tuyến

// 1. Tạo User (POST /users) -> Bất kỳ ai cũng có thể tạo (public)
// 4. Lấy TẤT CẢ User (GET /users) -> Chỉ 'Tổ trưởng'
router.route("/")
  .post(createUser) // <--- THAY ĐỔI: Đã gỡ bỏ 'protect' và 'authorize'
  .get(protect, authorize("Tổ trưởng"), getAllUsers); // <--- Giữ nguyên

// 5. Lấy 1 User (GET /users/:id) -> Bất kỳ ai đã đăng nhập
// 3. Sửa User (PUT /users/:id) -> Chỉ 'Tổ trưởng'
// 2. Xóa User (DELETE /users/:id) -> Chỉ 'Tổ trưởng'
router.route("/:id")
  .get(protect, getUserById) // <--- Giữ nguyên
  .put(protect, authorize("Tổ trưởng"), updateUser) // <--- THAY ĐỔI: Đã thêm 'authorize("Tổ trưởng")'
  .delete(protect, authorize("Tổ trưởng"), deleteUser); // <--- Giữ nguyên

export default router;