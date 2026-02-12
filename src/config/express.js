const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-mate-frontend-omega.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("CORS blocked: " + origin));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); //  handle preflight


// Body parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Static public folder
app.use(express.static("public"));

// Main routes
app.use("/", routes);

// Upload routes for file/audio
app.use("/messages", require("../routes/messages"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

module.exports = app;

