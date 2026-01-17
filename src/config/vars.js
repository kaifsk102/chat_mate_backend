const path = require("path");
require("dotenv").config();
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.example") });

// Default NODE_ENV to 'DEV' if not set
const NODE_ENV = process.env.NODE_ENV || "DEV";

// Validate required vars in production mode
if (NODE_ENV !== "DEV") {
  const requiredVars = [
    "PORT",
    "MONGO_CONNECTION_STRING",
    "JWT_SECRET",
    "EMAIL_USER",
    "EMAIL_PASS"
  ];

  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}

module.exports = {
  env: NODE_ENV,
  PORT: process.env.PORT || 3001, // fallback for local dev
  mongodb: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  public_image_url: (process.env.PUBLIC_URL || "") + "/images/",
  host_url: process.env.HOST_URL,
  tokenExpiryLimit: 86400,
  otpExpiryLimit: 1,
  isAppSocketIOEnable: (process.env.APP_SOCKET_IO_ENABLE || "true") === "true",
  mail: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
};
