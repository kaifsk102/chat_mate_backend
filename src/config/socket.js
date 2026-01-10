const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./express");
const { Message } = require("../models");
const { jwtSecret } = require("./vars");

const server = http.createServer(app);

// Track online users (userId -> socket count)
const onlineUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: ["https://chat-mate-backend-gv2e.onrender.com/"],
    credentials: true,
  },
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

  // ONLINE USERS (handle multi-tabs)
  onlineUsers.set(userId, (onlineUsers.get(userId) || 0) + 1);
  io.emit("online_users", Array.from(onlineUsers.keys()));

  socket.join(userId);

  // SEND MESSAGE
  socket.on("send_message", async ({ receiverId, text }) => {
    const message = await Message.create({
      senderId: userId,
      receiverId,
      text,
      createdAt: new Date(),
    });

    io.to(receiverId).emit("receive_message", message);
    io.to(userId).emit("receive_message", message);
  });

  // TYPING INDICATOR
  socket.on("typing", ({ receiverId }) => {
    socket.to(receiverId).emit("typing", {
      senderId: userId,
    });
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", userId);

    const count = onlineUsers.get(userId) - 1;
    if (count <= 0) {
      onlineUsers.delete(userId);
    } else {
      onlineUsers.set(userId, count);
    }

    io.emit("online_users", Array.from(onlineUsers.keys()));
  });
});

module.exports = server;
