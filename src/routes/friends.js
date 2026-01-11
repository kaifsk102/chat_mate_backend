const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  sendRequest,
  acceptRequest,
  getRequests,
} = require("../controllers/FriendController");

router.post("/api/send", verifyToken, sendRequest);
router.post("/api/accept", verifyToken, acceptRequest);
router.get("/api/requests", verifyToken, getRequests);

module.exports = router;
