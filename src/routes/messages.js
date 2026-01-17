const router = require("express").Router();
const upload = require("../middlewares/upload");
const { Message } = require("../models");
const { io } = require("../config/socket");

//  Upload File (Images / Docs / PDF)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { senderId, receiverId, replyTo } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const message = await Message.create({
      senderId,
      receiverId,
      fileUrl: `/uploads/${req.file.filename}`,
      replyTo: replyTo || null,
      status: "sent",
    });


  //   broadcast
  io.to(receiverId).emit("receive_message", msg);
  io.to(senderId).emit("receive_message", msg);

    return res.json(message);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//  Upload Audio (Voice Notes)
router.post("/audio", upload.single("audio"), async (req, res) => {
  try {
    const { senderId, receiverId, replyTo } = req.body;

    if (!req.file) return res.status(400).json({ error: "No audio uploaded" });

    const message = await Message.create({
      senderId,
      receiverId,
      audioUrl: `/uploads/${req.file.filename}`,
      replyTo: replyTo || null,
      status: "sent",
    });

    return res.json(message);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//  Fetch chat
router.get("/:userId/:receiverId", async (req, res) => {
  try {
    const { userId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    })
      .populate("replyTo")
      .sort({ createdAt: 1 });

    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
