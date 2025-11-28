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
  authorizePermission("APPROVE REQUEST"),
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
  authorizePermission("APPROVE REQUEST"),
  rejectRequest
);

export default router;
