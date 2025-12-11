import express from "express";
import { getDashboardStats } from "../controllers/statsController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

// Chỉ Tổ trưởng hoặc Kế toán mới được xem
router.get("/dashboard", protect, authorizePermission("VIEW FEE STATS"), getDashboardStats);

export default router;