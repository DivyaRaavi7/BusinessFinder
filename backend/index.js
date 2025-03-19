import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import businessRoutes from "./routes/businessRoutes.js";
import authRoutes from "./routes/userRoutes.js"; // ✅ Import auth routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/business", businessRoutes);
app.use("/api/auth", authRoutes); // ✅ Fix added

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
