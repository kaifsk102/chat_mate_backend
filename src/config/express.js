const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();

// Body parsing (file uploads safe)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS
app.use(cors());

// Static public folder
app.use(express.static("public"));

// All main API routes
app.use("/", routes);

// Upload routes for file/audio
app.use("/messages", require("../routes/messages"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Health check endpoint for Render
app.get("/", (req, res) => {
  res.status(200).send("Chat Mate Backend is running!");
});

module.exports = app;
