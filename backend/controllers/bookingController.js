import Booking from "../models/Booking.js";
import Business from "../models/Business.js";
import sendEmail from "../utils/sendEmail.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { businessId, date, time, service } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const booking = new Booking({
      user: req.user._id,
      business: businessId,
      date,
      time,
      service,
      status: "Pending",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });

    // Send confirmation email
    await sendEmail(req.user.email, "Booking Confirmation", `<h1>Your booking is confirmed</h1>`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("business");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get business's bookings
export const getBusinessBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ business: req.params.businessId }).populate("user");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateBookingStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await Booking.findById(req.params.id);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      booking.status = status || booking.status;
      await booking.save();
  
      res.json({ message: "Booking status updated successfully", booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  