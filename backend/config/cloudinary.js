import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const connectCloudinary = async () => {
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  console.log('✅ Cloudinary connected');
   console.log("✅ Cloudinary configured");
  console.log("🔍 Loaded config:", {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ present" : "❌ missing",
  });

};

export default connectCloudinary;
