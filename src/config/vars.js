const path = require("path");
const dotenv = require("dotenv").config();
const dotenvExample = require("dotenv").config({
 
  path: path.resolve(process.cwd(), ".env.example"),
});

if (
  JSON.stringify(Object.keys(dotenv.parsed).sort()) !==
  JSON.stringify(Object.keys(dotenvExample.parsed).sort())
) {
  throw Error("Missing values in .env Please refer to .env.example");
}

module.exports = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  public_image_url: process.env.PUBLIC_URL + "/images/",
  host_url: process.env.HOST_URL,
  tokenExpiryLimit: 86400, //3600
  otpExpiryLimit: 1,
  isAppSocketIOEnable: process.env.APP_SOCKET_IO_ENABLE === "true",
  mail: {
    host: "smtp.hostinger.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
    },
  },
};
