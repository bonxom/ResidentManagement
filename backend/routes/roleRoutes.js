import { Router } from "express";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "../controllers/roleController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, authorizePermission("CREATE ROLE"), createRole);
router.get("/", protect, authorizePermission("VIEW ROLES"), getAllRoles);
router.get("/:id", protect, authorizePermission("VIEW ROLES"), getRole);
router.put("/:id", protect, authorizePermission("EDIT ROLE"), updateRole);
router.delete("/:id", protect, authorizePermission("DELETE ROLE"), deleteRole);

export default router;
