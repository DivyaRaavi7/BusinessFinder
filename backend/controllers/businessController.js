import Business from "../models/Business.js";
import Booking from "../models/Booking.js"; // ✅ Import Booking model
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

dotenv.config();

// ✅ Configure Cloudinary properly
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image to Cloudinary
const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, { folder: "business_images" });
        return result.secure_url; // Get uploaded image URL
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Image upload failed");
    }
};

// ✅ Create a new business
export const createBusiness = async (req, res) => {
    try {
        const { name, category, location, services, pricing, description } = req.body;
        const owner = req.user.id; // Extract user ID from token

        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadImage(req.file.path); // Upload image and get URL
        }

        const newBusiness = new Business({
            owner,
            name,
            category,
            location,
            services,
            pricing,
            description,
            image: imageUrl
        });

        await newBusiness.save();
        res.status(201).json({ success: true, business: newBusiness });
    } catch (error) {
        console.error("Business creation error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Get business details by owner
export const getBusinessByOwner = async (req, res) => {
    try {
        const businesses = await Business.find({ owner: req.user.id }).populate("bookings");
        res.status(200).json({ success: true, businesses });
    } catch (error) {
        console.error("Error fetching business:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Get a single business by ID
export const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate("bookings");
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }
        res.status(200).json({ success: true, business });
    } catch (error) {
        console.error("Error fetching business by ID:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Update a business
export const updateBusiness = async (req, res) => {
    try {
        const { name, category, location, services, pricing, description } = req.body;
        let imageUrl = null;

        // Check if the business exists
        let business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }

        // Ensure only the owner can update
        if (business.owner.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // If a new image is uploaded, update it in Cloudinary
        if (req.file) {
            imageUrl = await uploadImage(req.file.path);
        }

        // Update business details
        business = await Business.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                location,
                services,
                pricing,
                description,
                image: imageUrl || business.image // Keep old image if not updated
            },
            { new: true }
        );

        res.status(200).json({ success: true, business });
    } catch (error) {
        console.error("Error updating business:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Delete a business
export const deleteBusiness = async (req, res) => {
    try {
        // Check if the business exists
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }

        // Ensure only the owner can delete
        if (business.owner.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // Delete the business
        await Business.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Business deleted successfully" });
    } catch (error) {
        console.error("Error deleting business:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getBusinessesByCategoryAndLocation = async (req, res) => {
    try {
        const { category, location } = req.query;

        if (!category || !location) {
            return res.status(400).json({ success: false, message: "Category and location are required" });
        }

        console.log("🔹 Searching for businesses in:", category, "at", location);

        const businesses = await Business.find({
            category: { $regex: new RegExp(category, "i") },  // Case-insensitive
            location: { $regex: new RegExp(location, "i") }   // Fix: Added "i" flag for case-insensitivity
        });

        console.log("✅ Found businesses:", businesses.length);

        res.status(200).json({ success: true, businesses });
    } catch (error) {
        console.error("❌ Error fetching businesses:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export const getAllBusinesses = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalBusinesses = await Business.countDocuments();
        const businesses = await Business.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("owner", "name email"); // Fetch owner details if needed

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(totalBusinesses / limit),
            businesses
        });
    } catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

