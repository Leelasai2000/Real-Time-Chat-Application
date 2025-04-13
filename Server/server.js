const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bcrypt = require("bcryptjs");

const http = require("http"); // ✅ Required to create server for Socket.IO
const { Server } = require("socket.io"); // ✅ Import Socket.IO

dotenv.config(); // Load variables from .env

const app = express();
app.use(cors()); // ✅ Enable CORS for frontend-backend communication
app.use(express.json()); // ✅ Parse incoming JSON
app.use("/api/users", userRoutes); // ✅ API route

// ✅ Create HTTP server to attach Socket.IO
const server = http.createServer(app);

// ✅ Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // You can add other headers if needed
  },
});


// ✅ Handle real-time connections
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("📩 Message received:", data);
    io.emit("receive_message", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


// ✅ MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("❌ Mongoose connection failed:", err);
    process.exit(1);
  }
};

connectDB();

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("Welcome to the Real-Time Chat App Backend!");
});