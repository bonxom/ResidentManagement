import express from "express";
import { loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

// @route   POST /auth/login
router.post("/login", loginUser);

// @route   GET /auth/me
// Khi gọi API này, nó sẽ chạy 'protect' trước, 'protect' thành công
// mới chạy 'getMe'
router.get("/me", protect, getMe); 

export default router;