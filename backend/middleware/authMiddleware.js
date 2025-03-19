import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;
    console.log("Authorization Header:", req.headers.authorization); // Debugging

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Extracted Token:", token); // Debugging

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded); // Debugging

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found." });
            }

            next();
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ success: false, message: "Invalid or expired token." });
        }
    } else {
        console.error("No Authorization Token Provided");
        return res.status(401).json({ success: false, message: "Not authorized. Please log in." });
    }
};
