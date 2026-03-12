const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your name: ", (username) => {

  socket.emit("join", username);

  rl.on("line", (input) => {
    socket.emit("chat-message", input);
  });

});

socket.on("chat-message", (data) => {
  console.log(`${data.user}: ${data.message}`);
});

socket.on("system-message", (msg) => {
  console.log("[system]", msg);
});