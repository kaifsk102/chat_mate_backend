const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Otp } = require("../models");
const sendOtpEmail = require("../utils/sendEmail");
const { jwtSecret } = require("../config/vars");


//LOGIN 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // generate JWT
    const token = jwt.sign(
    { id: user._id, email: user.email },
      jwtSecret,
    { expiresIn: "7d" }
     );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Something went wrong. Please contact support team.",
    });
  }
};


//SIGNUP 
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      password,
      confirm_password,
      otp,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone_number ||
      !password ||
      !confirm_password ||
      !otp
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // check OTP
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

// delete OTP
  await Otp.deleteMany({ email });

  const token = jwt.sign(
  { id: user._id, email: user.email },
  jwtSecret,
  { expiresIn: "7d" }
);

return res.status(201).json({
  message: "User created successfully.",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  },
});

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Something went wrong. Please contact support team.",
    });
  }
};


// ================= SEND OTP =================

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("SEND OTP API HIT");
    console.log("EMAIL RECEIVED:", email);

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("GENERATED OTP:", generatedOtp);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: generatedOtp });

    console.log("SENDING EMAIL...");
    await sendOtpEmail(email, generatedOtp);
    console.log("EMAIL SENT SUCCESSFULLY");

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  signup,
  sendOtp,
};
