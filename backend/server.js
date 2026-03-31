import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    socket.to(room).emit("message", {
      user: "System",
      text: `${username} joined`,
    });
  });

  socket.on("sendMessage", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("message", {
        user: user.username,
        text: msg,
      });
    }
  });

  socket.on("typing", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("typing", user.username);
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("message", {
        user: "System",
        text: `${user.username} left`,
      });
      delete users[socket.id];
    }
  });
});

server.listen(5000, () => console.log("Backend running on 5000"));