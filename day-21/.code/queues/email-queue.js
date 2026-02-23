const Queue = require("bull");
const redis = require("../redis-client");

const emailQueue = new Queue("email-queue", {
  redis: redis.options
});

module.exports = emailQueue;