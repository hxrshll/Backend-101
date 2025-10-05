
# Day 3.1 – RESTful APIs Deep Dive

Welcome to Day 3.1 of the Backend 101 – 30-day challenge!
Today we go beyond basic CRUD and explore RESTful API design principles, versioning, filtering, headers, caching, and error handling, with a hands-on example.

---

## Table of Contents
1. [Theory](#theory)
2. [Hands-On: Build an Advanced REST API](#hands-on-build-an-advanced-rest-api)
3. [What You Learned](#what-you-learned)
4. [Resources](#resources)

---

## Theory

### 1. REST Constraints Beyond Statelessness
- **Client-Server Architecture:** Frontend handles UI; backend handles logic & data.
- **Statelessness:** Each request must carry all info needed. Use JWTs instead of sessions.
- **Cacheability:** Use headers like `Cache-Control`, `ETag` to reduce server load.
- **Uniform Interface:** Standard URIs, HTTP methods, self-descriptive messages.
- **Layered System:** Clients may go through proxies/load balancers without knowing.
- **Code-On-Demand (optional):** Server sends executable code (rare).

### 2. Resource Modeling (Nouns > Verbs)
- Use nouns for resources: `/tasks`, `/users/123/tasks`
- Avoid verbs: `/getUser/123` or `/createTask`
- Makes APIs predictable, cache-friendly, and easier to document.

### 3. URI Naming & Versioning
- Plural nouns, lowercase, hyphen-separated: `/user-profiles`
- Include version: `/api/v1/tasks`
- Keep endpoints intuitive; developers should guess them without docs.

### 4. Idempotency & HTTP Methods
| Method | Idempotent? | Meaning |
|--------|-------------|---------|
| GET    | ✅ Yes      | Retrieve resource |
| PUT    | ✅ Yes      | Replace entire resource |
| PATCH  | ⚠ Partially| Partial update |
| POST   | ❌ No       | Create new resource each call |
| DELETE | ✅ Yes      | Remove resource |

Practical tip: retry PUT/DELETE safely; POST retries may create duplicates.

### 5. PUT vs PATCH
**PUT:** Full replacement:
```http
PUT /tasks/1
{
  "id":1,
  "title":"New",
  "status":"done"
}
```

**PATCH:** Partial update:
```http
PATCH /tasks/1
{
  "status":"done"
}
```

### 6. Route Params vs Query Params
- **Route params:** identify specific resources `/tasks/123`
- **Query params:** filtering, sorting, pagination `/tasks?status=completed&page=2&limit=10`

### 7. Pagination, Filtering, Sorting
- Pagination: `?page=2&limit=20`
- Filtering: `?status=active&category=backend`
- Sorting: `?sort=createdAt&order=desc`
- Prevents overloading clients and servers.

### 8. Headers & Error Responses
- **Content-Type:** type of data sent
- **Accept:** type of data client expects
- **Authorization:** JWT/OAuth tokens
- Errors always JSON:
```json
{
  "error": {
    "code": 404,
    "message": "Task not found"
  }
}
```

### 9. Caching
- **ETag / Last-Modified:** detect changes
- **Cache-Control:** `public, max-age=60`
- Reduces server load and speeds up repeated requests.

### 10. HATEOAS (Optional)
Include links to related actions in response:
```json
{
  "id": 123,
  "name": "Task 1",
  "links": { "self": "/tasks/123", "complete": "/tasks/123/complete" }
}
```

---

## Hands-On: Build an Advanced REST API

### Setup
```bash
mkdir day-03-advanced-rest
cd day-03-advanced-rest
npm init -y
npm install express
npm install nodemon --save-dev
```

### Step 1: Initialize Express Server
```js
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Task 1", status: "pending", category: "backend" },
  { id: 2, title: "Task 2", status: "completed", category: "frontend" },
];
```

### Step 2: Versioned API & CRUD
```js
const apiVersion = '/api/v1';

// GET all tasks with filtering, pagination, sorting
app.get(`${apiVersion}/tasks`, (req, res) => {
  let { status, category, page = 1, limit = 10, sort = 'id', order = 'asc' } = req.query;
  let filtered = [...tasks];

  if (status) filtered = filtered.filter(t => t.status === status);
  if (category) filtered = filtered.filter(t => t.category === category);

  filtered.sort((a,b) => (a[sort] > b[sort] ? 1 : -1) * (order === 'asc' ? 1 : -1));

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  res.status(200).json({ page, limit, total: filtered.length, data: paginated });
});

// GET single task by ID
app.get(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });
  res.status(200).json(task);
});

// POST new task
app.post(`${apiVersion}/tasks`, (req, res) => {
  const { title, status, category } = req.body;
  if (!title || !status) return res.status(400).json({ error: { code: 400, message: "Missing fields" } });
  const newTask = { id: tasks.length + 1, title, status, category };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT full update
app.put(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });
  const { title, status, category } = req.body;
  if (!title || !status) return res.status(400).json({ error: { code: 400, message: "Missing fields" } });
  task.title = title; task.status = status; task.category = category;
  res.status(200).json(task);
});

// PATCH partial update
app.patch(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });
  const { title, status, category } = req.body;
  if (title) task.title = title;
  if (status) task.status = status;
  if (category) task.category = category;
  res.status(200).json(task);
});

// DELETE
app.delete(`${apiVersion}/tasks/:id`, (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: { code: 404, message: "Task not found" } });
  tasks.splice(index, 1);
  res.status(204).send();
});
```

### Step 3: Optional ETag Caching
```js
const crypto = require('crypto');

app.get(`${apiVersion}/tasks/:id`, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: { code: 404, message: "Task not found" } });

  const etag = crypto.createHash('md5').update(JSON.stringify(task)).digest('hex');
  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag) return res.status(304).send();
  res.status(200).json(task);
});
```

### Step 4: Start the Server
```js
const PORT = 3000;
app.listen(PORT, () => console.log(`Advanced REST API running at http://localhost:${PORT}`));
```

### Step 5: Test Features
- Versioned endpoints: `/api/v1/tasks`
- Filtering: `/api/v1/tasks?status=pending`
- Pagination: `/api/v1/tasks?page=1&limit=1`
- Sorting: `/api/v1/tasks?sort=title&order=desc`
- Partial updates: `PATCH /api/v1/tasks/1`
- ETag caching: simulate `If-None-Match` requests
- Structured JSON error responses

---

## What You Learned

- Versioned, filterable, paginated REST APIs
- PUT vs PATCH and idempotency
- Route params vs query params
- ETag caching and headers
- Structured JSON error responses
- Practical REST constraints beyond statelessness

---

## Resources

- [RESTful API Design](https://restfulapi.net/)
- [MDN: HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [API Versioning Best Practices](https://www.turing.com/kb/api-versioning-best-practices)