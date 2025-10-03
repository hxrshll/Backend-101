const express = require('express');
const app = express();

// Middleware to parse JSON in POST requests
app.use(express.json());

// GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello from GET!');
});

// POST /echo
app.post('/echo', (req, res) => {
  const data = req.body;
  res.status(201).json({
    message: 'Received your data!',
    data,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
