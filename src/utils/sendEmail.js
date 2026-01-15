const axios = require("axios");

async function sendOtpEmail(to, otp) {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.EMAIL_FROM, name: "Chat Mate" },
        to: [{ email: to }],
        subject: "Your OTP Code",
        htmlContent: `<h1>${otp}</h1><p>Valid for 5 minutes.</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Email Send Error:", err.response?.data || err.message);
    throw new Error("Failed to send OTP email");
  }
}

module.exports = sendOtpEmail;
