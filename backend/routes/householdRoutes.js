import express from "express";
import {
  createHousehold,
  getAllHouseholds,
  getHouseholdById,
  updateHousehold,
  deleteHousehold,
  getMembers,
  addMember,
  removeMember,
} from "../controllers/householdController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- Các route chính cho Hộ khẩu ---

router
  .route("/")
  // HAMLET LEADER tạo hộ khẩu
  .post(protect, authorize("TỔ TRƯỞNG"), createHousehold)
  // HAMLET LEADER xem tất cả hộ khẩu
  .get(protect, authorize("TỔ TRƯỞNG"), getAllHouseholds);

router
  .route("/:id")
  // Mọi người đã đăng nhập có thể xem chi tiết
  .get(protect, getHouseholdById)
  // HAMLET LEADER cập nhật hộ khẩu
  .put(protect, authorize("TỔ TRƯỞNG"), updateHousehold)
  // HAMLET LEADER xóa hộ khẩu
  .delete(protect, authorize("TỔ TRƯỞNG"), deleteHousehold);

// --- Các route cho Thành viên (Members) ---

// Lấy danh sách thành viên của 1 hộ
router
  .route("/:id/members")
  .get(protect, getMembers)
  // HAMLET LEADER thêm thành viên vào hộ
  .post(protect, authorize("TỔ TRƯỞNG"), addMember);

// HAMLET LEADER xóa thành viên khỏi hộ
router
  .route("/:householdId/members/:memberId")
  .delete(protect, authorize("TỔ TRƯỞNG"), removeMember);

export default router;
