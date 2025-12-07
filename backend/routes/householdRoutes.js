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
  getResidentHistory,
  addTemporaryResident,
  endOfTemporaryLiving,
  splitHousehold,
  moveMember,
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

router.get("/:householdId/resident-histories", protect, authorize("HAMLET LEADER"), getResidentHistory);
router.post("/:householdId/temporary-residents", protect, authorize("HAMLET LEADER"), addTemporaryResident);
router.put("/:householdId/temporary-residents/end", protect, authorize("HAMLET LEADER"), endOfTemporaryLiving);

export default router;
