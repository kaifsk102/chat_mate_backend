const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();

// Body parsing (50mb if you need file uploads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static files
app.use(express.static("public"));

// Enable CORS
app.use(cors());

// Mount API routes
app.use("/", routes);

module.exports = app;
