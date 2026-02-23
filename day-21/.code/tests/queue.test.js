const emailQueue = require("../queues/email-queue");

async function run() {
  console.log("Adding test job...");

  await emailQueue.add({ email: "queue@test.com" });

  console.log("Job added");
}

run();