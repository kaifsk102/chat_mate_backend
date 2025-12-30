const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  sendRequest,
  acceptRequest,
  getRequests,
} = require("../controllers/FriendController");

router.post("/send", verifyToken, sendRequest);
router.post("/accept", verifyToken, acceptRequest);
router.get("/requests", verifyToken, getRequests);

module.exports = router;
