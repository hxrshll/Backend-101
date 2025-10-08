require('dotenv').config();
const express = require('express');
const db = require('./db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
