const Queue = require("bull");
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: 6379
});

const emailQueue = new Queue("email", {
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: 6379
  }
});

console.log("Worker started. Waiting for jobs...");

emailQueue.process(async (job) => {
  console.log("Processing job:", job.data);

  // simulate email sending
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Email sent to", job.data.email);
});