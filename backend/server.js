const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Application = require("./models/Application");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.send("Grihawas backend is running");
});

// ===============================
// Submit Application
// ===============================

app.post("/api/applications", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      property,
      visitDate,
      configuration,
      budget,
      message,
    } = req.body;

    // Required field validation

    if (!fullName || !phone || !email || !property || !configuration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Phone validation

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Indian mobile number.",
      });
    }

    // Email validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // Create application

    const application = new Application({
      fullName,
      phone,
      email,
      property,
      visitDate,
      configuration,
      budget,
      message,
    });

    // Save to MongoDB

    await application.save();

    // Send response

    res.status(201).json({
      success: true,

      message: "Application submitted successfully.",

      applicationId: application._id,
    });
  } catch (error) {
    console.error("Application submission error:", error);

    res.status(500).json({
      success: false,

      message: "Server error. Please try again later.",
    });
  }
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
