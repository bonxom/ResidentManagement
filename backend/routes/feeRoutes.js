import { Router } from "express";
import {
  createFee,
  deleteFee,
  getFeeById,
  getFees,
  updateFee,
} from "../controllers/feeController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, authorizePermission("CREATE FEE"), createFee);
router.get("/", protect, authorizePermission("VIEW FEES"), getFees);
router.get("/:id", protect, authorizePermission("VIEW FEES"), getFeeById);
router.put("/:id", protect, authorizePermission("EDIT FEE"), updateFee);
router.delete("/:id", protect, authorizePermission("DELETE FEE"), deleteFee);

export default router;
