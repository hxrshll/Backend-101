require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const User = require('./models/User');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// SQLite POST /users
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// MongoDB POST /users
app.post('/mongo-users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const user = await User.create({ name, email });
  res.status(201).json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
