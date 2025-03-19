import express from "express";
import { 
    createBusiness, 
    getBusinessByOwner, 
    getBusinessById, 
    updateBusiness, 
    deleteBusiness, 
    getBusinessesByCategoryAndLocation, 
    getAllBusinesses 
} from "../controllers/businessController.js"; 

import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Create a new business (Protected Route)
router.post("/", protect, upload.single("image"), async (req, res, next) => {
    console.log("🔹 POST /api/business - Creating a new business");
    next();
}, createBusiness);

// ✅ Get all businesses with pagination
router.get("/", async (req, res, next) => {
    console.log("🔹 GET /api/business - Fetching all businesses");
    next();
}, getAllBusinesses);

// ✅ Get business details by owner (Protected Route)
router.get("/owner", protect, async (req, res, next) => {
    console.log("🔹 GET /api/business/owner - Fetching business by owner");
    next();
}, getBusinessByOwner);

// ✅ Get businesses by category and location
router.get("/search", async (req, res, next) => {
    console.log("🔹 GET /api/business/search - Searching businesses");
    console.log("🔍 Query Params:", req.query); // Logs category & location
    next();
}, getBusinessesByCategoryAndLocation);

// ✅ Get a single business by ID
router.get("/:id", async (req, res, next) => {
    console.log(`🔹 GET /api/business/${req.params.id} - Fetching business details`);
    next();
}, getBusinessById);

// ✅ Update a business (Protected Route)
router.put("/:id", protect, upload.single("image"), async (req, res, next) => {
    console.log(`🔹 PUT /api/business/${req.params.id} - Updating business`);
    next();
}, updateBusiness);

// ✅ Delete a business (Protected Route)
router.delete("/:id", protect, async (req, res, next) => {
    console.log(`🔹 DELETE /api/business/${req.params.id} - Deleting business`);
    next();
}, deleteBusiness);

export default router;
