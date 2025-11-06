import { Router } from "express";
import { createPermission, deletePermission, getAllPermission, getPermission, updatePermission } from "../controllers/permissionController.js";

const router = Router();

router.post("/", createPermission);
router.get("/", getAllPermission);
router.get("/:id", getPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;