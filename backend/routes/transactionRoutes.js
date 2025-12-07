import express from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizePermission("RECORD PAYMENT"), createTransaction);
router.get("/", protect, authorizePermission("VIEW FEES"), getTransactions);

export default router;
