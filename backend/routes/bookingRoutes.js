import express from "express";
import { createBooking, getUserBookings, getBusinessBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { protect, isBusinessOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking); // Book an appointment
router.get("/user", protect, getUserBookings); // Get bookings for a user
router.get("/business", protect, isBusinessOwner, getBusinessBookings); // Get bookings for a business
router.put("/:id", protect, isBusinessOwner, updateBookingStatus); // Update booking status (Confirmed, Completed, etc.)

export default router;
