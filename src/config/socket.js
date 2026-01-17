const http = require("node:http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./express");
const { Message } = require("../models");
const { jwtSecret } = require("./vars");


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chat-mate-frontend-omega.vercel.app"
    ],
    credentials: true,
  },
   transports: ["websocket"],  
});


io.engine.use((req, res, next) => {
  return next();
});

// SOCKET AUTH
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, jwtSecret);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  const userId = socket.user.id;
  console.log("🟢 User connected:", userId);

  onlineUsers.set(userId, (onlineUsers.get(userId) || 0) + 1);
  io.emit("online_users", Array.from(onlineUsers.keys()));

  socket.join(userId);

  socket.on("send_message", async ({ receiverId, text, replyTo }) => {
    const message = await Message.create({
      senderId: userId,
      receiverId,
      text,
      replyTo: replyTo || null,
      status: "sent",
      createdAt: new Date(),
    });

    io.to(receiverId).emit("receive_message", message);
    io.to(userId).emit("receive_message", message);
  });

  socket.on("message_delivered", async ({ messageId }) => {
    await Message.findByIdAndUpdate(messageId, { status: "delivered" });
  });

  socket.on("message_seen", async ({ messageId }) => {
    await Message.findByIdAndUpdate(messageId, { status: "seen" });
  });

  socket.on("typing", ({ receiverId }) => {
    socket.to(receiverId).emit("typing", { senderId: userId });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", userId);

    const count = onlineUsers.get(userId) - 1;
    if (count <= 0) onlineUsers.delete(userId);
    else onlineUsers.set(userId, count);

    io.emit("online_users", Array.from(onlineUsers.keys()));
  });
});

module.exports =  server;
