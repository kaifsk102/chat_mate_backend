const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    //  Text message (optional now)
    text: {
      type: String,
      default: null,
    },

    //  File upload support (image/pdf/docs)
    fileUrl: {
      type: String,
      default: null,
    },

    // Audio message (voice notes)
    audioUrl: {
      type: String,
      default: null,
    },

    // Reply to message (stores parent message _id)
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
      default: null,
    },

    //  Message status
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);
