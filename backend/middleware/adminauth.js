import jwt from "jsonwebtoken";

const AdminAuth = (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default AdminAuth;
