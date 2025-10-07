require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Auth API running on http://localhost:3000'));
