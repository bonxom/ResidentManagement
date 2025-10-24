import { Router } from "express";
import { createPermission } from "../controllers/permissionController.js";

const router = Router();

router.post("/", createPermission);

export default router;