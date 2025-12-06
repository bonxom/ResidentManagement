import { Router } from "express";
import {
  approveRequest,
  getAllRequests,
  rejectRequest,
} from "../../controllers/Request/registrationController.js";
import { protect, authorizePermission, authorize } from "../../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  protect,
  authorize("HAMLET LEADER"),
  getAllRequests
);

router.post(
  "/:id/approve",
  protect,
  authorize("HAMLET LEADER"),
  approveRequest
);

router.post(
  "/:id/reject",
  protect,
  authorize("HAMLET LEADER"),
  rejectRequest
);

export default router;
