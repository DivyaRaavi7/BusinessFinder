import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  let { name, email, password, role } = req.body;

  console.log("Received registration request:", { name, email, role });

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Normalize role to match Mongoose schema
    role = role.toLowerCase() === "businessowner" ? "businessOwner" : role;

    // ✅ Validate role to match allowed enum values
    if (!["user", "businessOwner"].includes(role)) {
      console.error(`Invalid role: ${role}`);
      return res.status(400).json({ message: "Invalid role specified" });
    }

    console.log("Creating new user...");
    const user = new User({ name, email, password, role });
    await user.save();

    if (user) {
      console.log("User created successfully:", user._id);
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        message: "User registered successfully",
      });
    } else {
      console.log("Failed to create user");
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Invalid password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for:", user._id);

    // ✅ Add this log to check if `name` is being retrieved
    console.log("User details being sent:", {
      _id: user._id,
      name: user.name,   // 🔥 Ensure this exists!
      email: user.email,
      role: user.role,
      token: "********", // Don't log the token for security
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      _id: user._id,
      name: user.name,   // ✅ This should contain the correct name
      email: user.email,
      role: user.role,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      console.log("User not found:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Profile retrieved for:", user._id);
    return res.json(user);
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
