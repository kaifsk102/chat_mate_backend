const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,     // SMTP Login
    pass: process.env.BREVO_SMTP_KEY, // SMTP Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});



transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP Connection Error:", err);
  } else {
    console.log("SMTP Connected Successfully!");
  }
});

const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Chat Mate" <${process.env.BREVO_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("Email Sent to", to);
  } catch (err) {
    console.error("Email Send Error:", err);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtpEmail;
