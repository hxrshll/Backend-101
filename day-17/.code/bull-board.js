const express = require('express');
const { router, setQueues } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const emailQueue = require('./queues/queue');

const app = express();

setQueues([new BullAdapter(emailQueue)]);
app.use('/admin/queues', router);

app.listen(3001, () => {
  console.log('Bull Board running on http://localhost:3001/admin/queues');
});
