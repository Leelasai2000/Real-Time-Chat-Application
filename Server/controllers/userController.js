const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password will be hashed in pre-save middleware)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Respond with user data + token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Respond with user data + token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
