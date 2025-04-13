const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema definition
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,  // To remove any extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // Convert email to lowercase before saving
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "", // Optional profile picture URL
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets the date when user is created
  },
});

// Hash password before saving user to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();  // Proceed with the save operation
  } catch (error) {
    next(error);  // Pass any error to the next middleware
  }
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
