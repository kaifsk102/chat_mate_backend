// const Controllers = require("../controllers");
// const Socket = Controllers.Socket;
// const { VerifySocketToken } = require("../middlewares");

module.exports = (io) => {
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    // VerifySocketToken(token, next);
  });

  //   io.of("/personal-chat").on("connection", (socket) =>
  //     Socket.PersonalChat(socket, io)
  //   );
};
