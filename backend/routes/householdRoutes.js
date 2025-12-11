import express from "express";
import {
  createHousehold,
  getAllHouseholds,
  getHouseholdById,
  getHouseholdResidents,
  updateHousehold,
  deleteHousehold,
  addMember,
  removeMember,
  splitHousehold,
  moveMember,
  getHouseholdChanges
} from "../controllers/householdController.js";

import { protect, authorizePermission, authorize } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, authorizePermission("CREATE HOUSEHOLD"), createHousehold);
router.get("/", protect, authorizePermission("VIEW HOUSEHOLD LIST"), getAllHouseholds);

router.get("/:id", protect, authorizePermission("VIEW HOUSEHOLD"), getHouseholdById);
router.get("/:id/members", protect, authorizePermission("VIEW HOUSEHOLD"), getHouseholdResidents);

router.put("/:id",protect, authorizePermission("EDIT HOUSEHOLD"), updateHousehold);
router.delete("/:id", protect, authorizePermission("DELETE HOUSEHOLD"), deleteHousehold);
router.post("/:id/members",protect, authorizePermission("EDIT HOUSEHOLD"), addMember);
router.delete("/:householdId/members/:memberId", protect, authorizePermission("EDIT HOUSEHOLD"), removeMember);
router.post("/split", protect, authorizePermission("EDIT HOUSEHOLD"), splitHousehold);
router.post("/move", protect, authorizePermission("EDIT HOUSEHOLD"), moveMember);

// Route xem biến động
router.get("/:id/changes", protect, authorizePermission("VIEW HOUSEHOLD"), getHouseholdChanges);
export default router;