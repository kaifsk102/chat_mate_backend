const path = require("path");
require("dotenv").config();

// Optional: only load .env.example for documentation, not override real envs
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.example"),
  override: false
});

const env = (process.env.NODE_ENV || "development").toLowerCase();
const isDev = env === "development";

// Validate only in development (so Render doesn’t break)
if (isDev) {
  const requiredVars = [
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
  port: process.env.PORT || 3001, 
  mongodb: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  env,
  public_image_url: (process.env.PUBLIC_URL || "") + "/images/",
  host_url: process.env.HOST_URL,
  tokenExpiryLimit: 86400,
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

