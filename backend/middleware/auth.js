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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Use decoded._id or decoded.id depending on your token payload
      const userId = decoded._id || decoded.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized, user not found" });
      }
      req.user = user; // This will include _id
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, authorization failed",
      });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token provided" });
  }
};

export const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
