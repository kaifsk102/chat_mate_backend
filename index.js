const { port, env, isAppSocketIOEnable } = require("./src/config/vars");
const app = require("./src/config/express");
const socket = require("./src/config/socket");
const mongoose = require("./src/config/mongoose");

// open mongoose connection
mongoose.connect();

// this is for listen to requests
const server = isAppSocketIOEnable ? socket : app;
server.listen(port, "0.0.0.0", () =>
  console.log(`Server started on port ${port} (${env})`)
);

