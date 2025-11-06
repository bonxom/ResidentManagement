import { Router } from "express";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "../controllers/roleController.js";

const router = Router();

router.post("/", createRole);
router.get("/", getAllRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;