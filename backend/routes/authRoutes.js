import express from "express";
import { loginUser, getMe } from "../controllers/authController.js";
import { register } from "../controllers/Request/registrationController.js";
import {
  approveRequest,
  getAllRequests,
  rejectRequest,
} from "../controllers/Request/registrationController.js";
import { protect, authorizePermission, authorize } from "../middleware/authMiddleware.js";


const router = express.Router();

// @route   POST /auth/login
router.post("/login", loginUser);
router.post("/register", register);

// @route   GET /auth/me
// Khi gọi API này, nó sẽ chạy 'protect' trước, 'protect' thành công
// mới chạy 'getMe'
router.get("/me", protect, getMe); 

export default router;
