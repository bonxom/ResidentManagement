import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", protect, authorize("HAMLET LEADER"), getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, authorize("HAMLET LEADER"), updateUser);
router.delete("/:id", protect, authorize("HAMLET LEADER"), deleteUser);

export default router;
