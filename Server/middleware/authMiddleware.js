const jwt = require("jsonwebtoken");
const User = require("../models/User"); // To fetch user by ID

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from DB and attach to request object
    req.user = await User.findById(decoded.id).select("-password"); // exclude password
    next(); // Pass control to next middleware/route
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
