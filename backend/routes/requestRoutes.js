import express from "express";
import {
  createUpdateRequest,
  getAllRequests,
  reviewRequest,
} from "../controllers/requestController.js";
// SỬA: Import đúng middleware authorizePermission
import { protect, authorizePermission } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// --- KHU VỰC DÀNH CHO CƯ DÂN & NGƯỜI DÙNG ---
router.post("/update-info", protect, createUpdateRequest);

// --- KHU VỰC DÀNH RIÊNG CHO TỔ TRƯỞNG ---

// Xem danh sách: Yêu cầu quyền READ REQUESTS LIST (đã define trong initialize.js)
router.get(
  "/",
  protect,
  authorizePermission("READ REQUESTS LIST"), 
  getAllRequests
);

// Duyệt đơn: Yêu cầu quyền APPROVE REQUEST
router.put(
  "/:id/review",
  protect,
  authorizePermission("APPROVE REQUEST"), 
  reviewRequest
);

export default router;