import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables"
  );
}

// Create Razorpay instance
export const razorpayinstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test connection (optional - remove in production)
if (process.env.NODE_ENV === "development") {
  razorpayinstance.orders
    .all({ count: 1 })
    .then(() => console.log("✅ Razorpay connection successful"))
    .catch((error) =>
      console.error("❌ Razorpay connection failed:", error.message)
    );
}

// Export a function to get instance (backward compatibility)
export const getRazorpayInstance = () => razorpayinstance;

export default razorpayinstance;
