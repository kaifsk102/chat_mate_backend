const { PORT, env, isAppSocketIOEnable } = require("./src/config/vars");
const app = require("./src/config/express");
const socket = require("./src/config/socket");
const mongoose = require("./src/config/mongoose");

mongoose.connect();

const server = isAppSocketIOEnable ? socket : app;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT} (${env})`);
});
