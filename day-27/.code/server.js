const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Chat server running");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    console.log(username + " joined the chat");

    io.emit("system-message", username + " joined the chat");
  });

  socket.on("chat-message", (message) => {
    const data = {
      user: socket.username,
      message: message
    };

    console.log(data);

    io.emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("system-message", socket.username + " left the chat");
    }

    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});