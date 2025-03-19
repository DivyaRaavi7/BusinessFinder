import express from "express";
import { createReview, getReviewsByBusiness } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:businessId", protect, createReview); // Add a review to a business
router.get("/:businessId", getReviewsByBusiness); // Get reviews for a business

export default router;
