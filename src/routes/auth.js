const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/api/login", AuthController.login);
router.post("/api/signup", AuthController.signup);
router.post("/api/sendotp", AuthController.sendOtp);

module.exports = router;
