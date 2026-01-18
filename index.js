const http = require("http");
const { port, env, isAppSocketIOEnable } = require("./src/config/vars");
const app = require("./src/config/express");
const socket = require("./src/config/socket");
const mongoose = require("./src/config/mongoose");

mongoose.connect();

const server = isAppSocketIOEnable
  ? socket // must be an httpServer if you built it correctly
  : http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port} (${env})`);
});
