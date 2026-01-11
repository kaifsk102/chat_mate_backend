const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "Chat Mate <onboarding@resend.dev>",
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
