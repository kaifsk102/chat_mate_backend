const { User, Otp } = require("../models");

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong. Please contact support team.",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      confirm_password,
      otp,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const inserted = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hasedPassword,
    });

    if (!inserted)
      return res.status(400).json({ error: "Failed to create user." });

    return res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong. Please contact support team.",
    });
  }
};

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate and send OTP logic here
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const insert = await Otp.create({ email, otp: generatedOtp });
    if (!insert)
      return res.status(400).json({ error: "Failed to generate OTP." });
    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong. Please contact support team.",
    });
  }
};
