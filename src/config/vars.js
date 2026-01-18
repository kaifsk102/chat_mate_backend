const path = require("path");
const dotenv = require("dotenv").config();
const dotenvExample = require("dotenv").config({path: path.resolve(process.cwd(), ".env.example"),});


if (process.env.NODE_ENV !== "DEV") {
  const requiredVars = [
    "PORT",
    "MONGO_CONNECTION_STRING",
    "JWT_SECRET",
    "EMAIL_FROM",
    "BREVO_API_KEY"
  ];

  const missing = requiredVars.filter(v => !process.env[v]);

  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}



module.exports = {
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  public_image_url: (process.env.PUBLIC_URL || "") + "/images/",
  host_url: process.env.HOST_URL,
  tokenExpiryLimit: 86400, //3600
  otpExpiryLimit: 1,
  isAppSocketIOEnable: process.env.APP_SOCKET_IO_ENABLE === "true",
  mail: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.BREVO_API_KEY,
    },
  },
};
