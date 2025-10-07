require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_FILE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  if (!filePath) {
    throw new Error("File path is required");
  }

  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // clog
    console.log("Upload to Cloudinary successful:", result);
    return result;
    
  } catch (error) {
    fs.unlinkSync(filePath); // Delete the file if upload fails

    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

module.exports = { uploadToCloudinary };
