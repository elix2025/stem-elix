import jwt from "jsonwebtoken";

const AdminAuth = (req, res, next) => {
  try {
    console.log('🔍 AdminAuth middleware - checking authorization...');
    
    // Read token from Authorization header
    const authHeader = req.headers.authorization;
    console.log('📋 Auth header:', authHeader ? authHeader.substring(0, 50) + '...' : 'None');
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log('❌ No valid authorization header found');
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log('❌ No token found in authorization header');
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    console.log('🔐 Token received:', token.substring(0, 30) + '...');
    console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded successfully:', {
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      exp: decoded.exp ? new Date(decoded.exp * 1000) : 'No expiration'
    });
    
    if (!decoded.isAdmin) {
      console.log('❌ User is not admin:', decoded.isAdmin);
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    console.log('✅ Admin authentication successful');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ AdminAuth error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(401).json({ success: false, message: 'Invalid token payload' });
  }
};

export default AdminAuth;
