const express = require("express");
const router = express.Router();
const path = require("path");
const { env, secret } = require("../config/vars");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Test API
router.get("/", (req, res) => {
  res.status(200).json({ message: "Chat Mate Backend Running..." });
});

// API Docs (dev-only)
if (env !== "PROD") {
  router.use(`/${secret}/apidocs`, express.static(__dirname + "/../../apidocs"));
}

// ------------------ MOUNT ROUTES ------------------
router.use("/auth", require("./auth"));
router.use("/users", require("./user"));
router.use("/friends", require("./friends"));

// ------------------ 404 HANDLER ------------------
router.use((req, res) => {
  res.status(404).json({ status: "failed", error: "Router not found." });
});

module.exports = router;
