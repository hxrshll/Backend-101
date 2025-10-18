const express = require('express');
const emailQueue = require('./queues/queue');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email } = req.body;

  // Simulate user registration
  console.log(`User registered: ${email}`);

  await emailQueue.add({ email });

  res.json({ message: 'Registration successful. Email will be sent shortly.' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
