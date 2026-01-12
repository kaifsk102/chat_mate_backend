const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
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
