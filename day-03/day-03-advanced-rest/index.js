const express = require('express');
const crypto = require('crypto'); // for optional ETag caching
const app = express();

app.use(express.json());

// In-memory task database
let tasks = [
  { id: 1, title: "Task 1", status: "pending", category: "backend" },
  { id: 2, title: "Task 2", status: "completed", category: "frontend" },
];

// API versioning
const apiVersion = '/api/v1';

/**
 * GET /tasks
 * Fetch all tasks with optional filtering, pagination, and sorting
 */
app.get(`${apiVersion}/tasks`, (req, res) => {
  let { status, category, page = 1, limit = 10, sort = 'id', order = 'asc' } = req.query;
  let filtered = [...tasks];

  if (status) filtered = filtered.filter(t => t.status === status);
  if (category) filtered = filtered.filter(t => t.category === category);

  filtered.sort((a, b) => (a[sort] > b[sort] ? 1 : -1) * (order === 'asc' ? 1 : -1));

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  res.status(200).json({ page, limit: Number(limit), total: filtered.length, data: paginated });
});

/**
 * GET /tasks/:id
 * Fetch a single task by ID with optional ETag caching
 */
app.get(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });

  // ETag caching
  const etag = crypto.createHash('md5').update(JSON.stringify(task)).digest('hex');
  res.setHeader('ETag', etag);
  if (req.headers['if-none-match'] === etag) return res.status(304).send();

  res.status(200).json(task);
});

/**
 * POST /tasks
 * Create a new task
 */
app.post(`${apiVersion}/tasks`, (req, res) => {
  const { title, status, category } = req.body;
  if (!title || !status) return res.status(400).json({ error: { code: 400, message: "Missing required fields" } });

  const newTask = { id: tasks.length + 1, title, status, category };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * PUT /tasks/:id
 * Full update of a task
 */
app.put(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });

  const { title, status, category } = req.body;
  if (!title || !status) return res.status(400).json({ error: { code: 400, message: "Missing required fields" } });

  task.title = title;
  task.status = status;
  task.category = category;

  res.status(200).json(task);
});

/**
 * PATCH /tasks/:id
 * Partial update of a task
 */
app.patch(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });

  const { title, status, category } = req.body;
  if (title) task.title = title;
  if (status) task.status = status;
  if (category) task.category = category;

  res.status(200).json(task);
});

/**
 * DELETE /tasks/:id
 * Remove a task
 */
app.delete(`${apiVersion}/tasks/:id`, (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: { code: 404, message: "Task not found" } });

  tasks.splice(index, 1);
  res.status(204).send();
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Advanced REST API running at http://localhost:${PORT}`));
