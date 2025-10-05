const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // JSON parser middleware

// Logger middleware
function timeLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
app.use(timeLogger);

// Content-Type validator (can be global or route-specific)
function requireJson(req, res, next) {
  if ((req.method === 'POST' || req.method === 'PUT') &&
      req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Content-Type must be application/json' });
  }
  next();
}

// Routes
app.get('/welcome', (req, res) => {
  res.send('Welcome to the backend!');
});

app.post('/echo', requireJson, (req, res) => {
  res.status(201).json({
    message: 'Received your data',
    data: req.body
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`You requested user with ID: ${userId}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
