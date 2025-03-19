import express from "express";
import { processPayment, getPaymentStatus } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, processPayment); // Process payment
router.get("/:id", protect, getPaymentStatus); // Get payment status

export default router;
