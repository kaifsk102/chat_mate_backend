const express = require("express");
const router = express.Router();
const fs = require("fs");
var path = require("path");
// const { VerifyToken } = require("../middlewares");
const { env, secret } = require("../config/vars");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Server Test API
router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

//Server API Docs
if (env !== "PROD") {
  router.use(
    `/${secret}/apidocs`,
    express.static(__dirname + "/../../apidocs")
  );
}

//Import APIs

// Protect all routes after this middleware
router.use("/api/auth", require("./auth"));
router.use("/api/users", require("./user"));
router.use("/api/friends", require("./friends"));


// No router found
router.use((req, res) => {
  res.status(404).json({ status: "failed", error: "Router not found." });
});


module.exports = router;
