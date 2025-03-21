import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(imagePath, {
      folder: "businesses", // Folder name in Cloudinary
      use_filename: true,
      unique_filename: false,
    });

    return result.secure_url; // Return the image URL
  } catch (error) {
    throw new Error("Image upload failed");
  }
};

export default uploadImage;
