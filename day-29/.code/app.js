const express = require("express");
const compression = require("compression");

const usersRoute = require("./routes/users");
const slowRoute = require("./routes/slow-users");

const app = express();

app.use(express.json());
app.use(compression());

app.use("/users", usersRoute);
app.use("/slow-users", slowRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});