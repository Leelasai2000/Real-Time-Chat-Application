const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);


// 🔐 Get all users except current user based on search query
router.get("/", authMiddleware, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find({
      ...keyword,
      _id: { $ne: req.user._id }, // exclude current user
    }).select("-password"); // hide password from results

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});
module.exports = router;
// This file defines the routes for user registration and login.