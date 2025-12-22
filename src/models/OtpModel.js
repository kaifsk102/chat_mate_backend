const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otps", OtpSchema);
module.exports = OtpModel;
