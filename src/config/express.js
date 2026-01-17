const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();

// Body parsing (file uploads safe)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static public folder
app.use(express.static("public"));

// CORS
app.use(cors());

// All main API routes
app.use("/", routes);

// Upload routes for file/audio
app.use("/messages", require("../routes/messages"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

module.exports = app;
