// testMail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail(
  {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "TEST EMAIL",
    text: "If you see this, email works.",
  },
  (err, info) => {
    if (err) {
      console.error("TEST FAILED ❌", err);
    } else {
      console.log("TEST SUCCESS ✅", info.response);
    }
  }
);
