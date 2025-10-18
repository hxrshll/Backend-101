const emailQueue = require('./queue');
const sendWelcomeEmail = require('../jobs/sendWelcomeEmail');

emailQueue.process(async (job) => {
  await sendWelcomeEmail(job.data);
});
