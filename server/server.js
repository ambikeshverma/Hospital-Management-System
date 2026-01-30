import { Server } from "socket.io";
import http from "http";
import app from "./app.js"; // your express app

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io; // so we can use it inside controllers

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-doctor", (doctorId) => {
    socket.join(`doctor-${doctorId}`);
  });

  socket.on("join-user", (userId) => {
    socket.join(`user-${userId}`);
  });

  socket.on("join-admin", () => {
    socket.join("admins");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
