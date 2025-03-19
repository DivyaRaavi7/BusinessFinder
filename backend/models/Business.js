import mongoose from "mongoose";
import Booking from "./Booking.js"; // ✅ Ensure Booking model is registered

const BusinessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    services: { type: String, required: true },
    pricing: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Store image URL
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // ✅ Ensure Booking is registered
    createdAt: { type: Date, default: Date.now }
});

const Business = mongoose.model("Business", BusinessSchema);
export default Business; // ✅ Use ES module export
