import { Router } from "express";
import {
  createTransaction,
  listTransactions,
  getFeeStats,
} from "../controllers/transactionController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  protect,
  authorizePermission("RECORD PAYMENT"),
  createTransaction
);
router.get(
  "/",
  protect,
  authorizePermission("VIEW FEES"),
  listTransactions
);

router.get(
  "/stats/:id",
  protect,
  authorizePermission("VIEW FEE STATS"),
  getFeeStats
);


export default router;
