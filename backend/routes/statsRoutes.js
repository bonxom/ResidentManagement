import { Router } from "express";
import { getFeeStats } from "../controllers/statsController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/fees/:id",
  protect,
  authorizePermission("VIEW FEE STATS"),
  getFeeStats
);

export default router;
