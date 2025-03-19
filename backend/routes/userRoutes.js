import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login user
router.get("/profile", protect, getUserProfile); // Get user profile (protected route)

export default router;
