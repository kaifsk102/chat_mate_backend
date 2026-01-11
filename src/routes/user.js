const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const { getFriends } = require("../controllers/UserController");

router.get("/", verifyToken, getFriends);
router.get("/friends", verifyToken, getFriends);

module.exports = router;
