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

router.post("/", protect, authorize("HAMLET LEADER"), createHousehold);
router.get("/", protect, authorize("HAMLET LEADER"), getAllHouseholds);

router.get("/:id", protect, getHouseholdById)
router.put("/:id",protect, authorize("HAMLET LEADER"), updateHousehold)
router.delete("/:id", protect, authorize("HAMLET LEADER"), deleteHousehold);

router.get("/:id/members", protect, getMembers)
router.post("/:id/members",protect, authorize("HAMLET LEADER"), addMember);

// HAMLET LEADER xóa thành viên khỏi hộ
router.delete("/:householdId/members/:memberId", protect, authorize("HAMLET LEADER"), removeMember);

export default router;
