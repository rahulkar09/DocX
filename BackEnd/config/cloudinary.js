// cloudinary.js
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  console.log("✅ Cloudinary configured");
};

module.exports = connectCloudinary;
