import { Router } from "express";
import {
  createTransaction,
  listTransactions,
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

export default router;
