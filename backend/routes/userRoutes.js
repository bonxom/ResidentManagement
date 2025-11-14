import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, authorize, authorizePermission } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", protect, authorizePermission("VIEW USER LIST"), getAllUsers);
router.get("/:id", protect, authorizePermission("VIEW USER"), getUserById);
router.put("/:id", protect, authorizePermission("EDIT USER"), updateUser);
router.delete("/:id", protect, authorizePermission("DELETE USER"), deleteUser);

export default router;
