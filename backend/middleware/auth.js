import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Check if token exists after splitting
      if (!token || token === "null" || token === "undefined") {
        console.log(
          "Auth middleware error: No token provided or invalid token"
        );
        return res.status(401).json({
          success: false,
          message: "Not authorized, no valid token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Use decoded._id or decoded.id depending on your token payload
      const userId = decoded._id || decoded.id;

      if (!userId) {
        console.log("Auth middleware error: No user ID in token");
        return res.status(401).json({
          success: false,
          message: "Invalid token payload",
        });
      }

      const user = await User.findById(userId).select("-password");
      if (!user) {
        console.log(`Auth middleware error: User not found for ID: ${userId}`);
        return res.status(401).json({
          success: false,
          message: "Not authorized, user not found",
        });
      }

      req.user = user; // This will include _id
      next();
    } catch (error) {
      console.log("Auth middleware error:", error.message);

      // Provide specific error messages for different JWT errors
      let message = "Invalid token, authorization failed";
      if (error.name === "JsonWebTokenError") {
        message = "Invalid token format";
      } else if (error.name === "TokenExpiredError") {
        message = "Token has expired";
      } else if (error.name === "NotBeforeError") {
        message = "Token not active yet";
      }

      return res.status(401).json({
        success: false,
        message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

export const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token || token === "null" || token === "undefined") {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("AuthUser middleware error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
