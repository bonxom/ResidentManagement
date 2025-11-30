import { Router } from "express";
import {
  approveRequest,
  getAllRequests,
  rejectRequest,
} from "../controllers/registrationController.js";
import { protect, authorizePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/requests",
  protect,
  authorizePermission("READ REQUESTS LIST"),
  getAllRequests
);

router.post(
  "/requests/:id/approve",
  protect,
  authorizePermission("APPROVE REQUEST"),
  approveRequest
);

router.post(
  "/requests/:id/reject",
  protect,
  authorizePermission("REJECT REQUEST"),
  rejectRequest
);

export default router;
