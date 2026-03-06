const express = require("express");
const emailQueue = require("./queues/email-queue");
const limiter = require("./utils/limiter");
const tracker = require("./utils/request-tracker");
const { signupRequests, client } = require("./metrics");

const app = express();
app.use(express.json());
app.use(tracker);

app.post("/signup", limiter, async (req, res) => {
  const { email } = req.body;

  console.log("Adding job to queue:", email);

  signupRequests.inc();
  await emailQueue.add({ email });

  res.json({ message: "Queued" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => console.log("Running on 3000"));