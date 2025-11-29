import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  getMyHousehold
} from "../controllers/userController.js";
import { protect, authorize, authorizePermission } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", protect, authorizePermission("VIEW USER LIST"), getAllUsers);
// Route cụ thể phải đặt trước route có param
router.get("/me/household", protect, getMyHousehold);
router.get("/:id", protect, authorizePermission("VIEW USER"), getUserById);
router.put("/:id", protect, authorizePermission("EDIT USER"), updateUser);
router.delete("/:id", protect, authorizePermission("DELETE USER"), deleteUser);
router.patch("/:id/password", protect, authorizePermission("RESET USER PASSWORD"), changePassword);

export default router;
