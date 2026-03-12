# Day 29: Performance Optimization

Welcome to **Day 29** of the Backend 101 30-day challenge. Today you will learn how to identify and fix performance bottlenecks in backend systems.

As applications grow and traffic increases, poorly optimized APIs begin to slow down. Requests take longer, databases struggle with heavy queries, and servers consume more resources than necessary.

**Performance optimization** focuses on identifying these bottlenecks and improving how your backend processes requests.

By the end of this lesson, you will understand common backend performance problems and learn practical techniques such as pagination, compression, query optimization, and caching.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Common Backend Bottlenecks](#common-backend-bottlenecks)
3. [Database Performance Issues](#database-performance-issues)
4. [The N+1 Query Problem](#the-n1-query-problem)
5. [Large Payloads and Network Cost](#large-payloads-and-network-cost)
6. [Blocking Code and Event Loops](#blocking-code-and-event-loops)
7. [Profiling Your API](#profiling-your-api)
8. [Optimization Techniques](#optimization-techniques)
9. [Hands-on: Pagination](#hands-on-pagination)
10. [Hands-on: Response Compression](#hands-on-response-compression)
11. [Hands-on: Query Optimization](#hands-on-query-optimization)
12. [Hands-on: Basic Caching](#hands-on-basic-caching)
13. [Best Practices](#best-practices)
14. [What You Learned](#what-you-learned)
15. [Further Reading](#further-reading)

---

## Introduction

Backend systems often work perfectly during early development when traffic is low.

However, as the number of users grows, performance problems begin to appear.

### Examples Include:
- Slow API responses
- Database queries taking too long
- Large responses consuming bandwidth
- Servers struggling under heavy traffic

**Performance optimization** focuses on improving efficiency so that systems remain responsive as usage grows.

Even small improvements can significantly reduce server load and improve user experience.

---

## Common Backend Bottlenecks

Several factors commonly cause backend performance issues.

| **Bottleneck**         | **Description**                          |
|-------------------------|------------------------------------------|
| Slow database queries   | Queries scanning large datasets          |
| Large payloads          | Sending too much data in responses       |
| Blocking code           | CPU-heavy operations blocking the event loop |
| Excessive requests      | APIs called too frequently               |
| Unoptimized indexes     | Database searches without indexing       |

Understanding these issues helps developers identify where optimization is needed.

---

## Database Performance Issues

Databases are one of the most common sources of performance problems.

Poorly written queries may scan entire tables instead of using indexes.

### Example Slow Query:
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

If the `email` column is not indexed, the database must scan every row.

### Adding an Index:
```sql
CREATE INDEX idx_users_email ON users(email);
```

Indexes allow the database to locate rows much faster.

---

## The N+1 Query Problem

Another common performance issue is the **N+1 query problem**.

This happens when an application runs one query to fetch a list of items and then runs additional queries for each item.

### Example Scenario:
1. Query to fetch all posts:
```sql
SELECT * FROM posts;
```

2. For each post, another query to fetch its author:
```sql
SELECT * FROM users WHERE id = post.user_id;
```

If there are 100 posts, this results in 101 queries.

### Optimized Solution:
Fetch the data in one query using joins:
```sql
SELECT posts.title, users.name
FROM posts
JOIN users ON posts.user_id = users.id;
```

This reduces the number of database queries dramatically.

---

## Large Payloads and Network Cost

Sending large responses increases network latency and bandwidth usage.

### Example Problem:
An API returns 10,000 records when the client only needs 10.

This wastes resources and slows down responses.

### Solution:
Limit the amount of returned data using **pagination**.

---

## Blocking Code and the Event Loop

Node.js uses a single-threaded event loop.

If CPU-heavy operations run synchronously, they block other requests.

### Example Blocking Code:
```javascript
for (let i = 0; i < 1e9; i++) {
  console.log(i);
}
```

While this loop runs, the server cannot process other requests.

### Solutions Include:
- Using asynchronous operations
- Moving heavy tasks to background workers
- Using queues or worker threads

---

## Profiling Your API

Before optimizing anything, developers should first identify slow parts of the system.

**Profiling** helps determine:
- Which endpoints are slow
- Which database queries take the longest
- How long each request takes

### Tools Commonly Used:
- Console timing tools
- Application logs
- Monitoring tools like Prometheus and Grafana
- Load testing tools such as Apache Bench or k6

### Example Timing Measurement:
```javascript
console.time("request");

await someDatabaseCall();

console.timeEnd("request");
```

This prints how long the operation took.

---

## Optimization Techniques

Several techniques can improve backend performance.

| **Technique**   | **Purpose**                        |
|------------------|------------------------------------|
| Pagination       | Limit returned results            |
| Compression      | Reduce response size              |
| Indexing         | Speed up database queries         |
| Caching          | Store frequently requested data   |
| Batching         | Combine multiple operations       |
| Load balancing   | Distribute traffic                |

These techniques are widely used in production systems.

---

## Hands-on: Pagination

**Pagination** limits how many results an API returns.

### Example:
```javascript
app.get("/users", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const users = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Amit" },
    { id: 3, name: "Priya" },
    { id: 4, name: "Rohit" },
    { id: 5, name: "Mohit" }
  ];

  const results = {};

  if (endIndex < users.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  results.data = users.slice(startIndex, endIndex);

  res.json(results);
});
```

### Example Request:
```
GET /users?page=1&limit=2
```

### Response Example:
```json
{
  "next": { "page": 2, "limit": 2 },
  "data": [
    { "id": 1, "name": "Rahul" },
    { "id": 2, "name": "Amit" }
  ]
}
```

Pagination prevents APIs from returning excessive data.

---

## Hands-on: Response Compression

**Compression** reduces the size of HTTP responses.

### Install Dependency:
```bash
npm install compression
```

### Enable Compression Middleware:
```javascript
const compression = require("compression");

app.use(compression());
```

Responses will now be compressed using gzip before being sent to the client.

This reduces network transfer size and improves response times.

---

## Hands-on: Query Optimization

Efficient queries reduce database load.

### Inefficient Query:
```sql
SELECT * FROM users;
```

### Optimized Query:
```sql
SELECT id, name FROM users;
```

Fetching fewer columns reduces memory usage and speeds up queries.

---

## Hands-on: Basic Caching

**Caching** stores frequently requested data so it can be returned quickly.

### Example Using an In-Memory Cache:
```javascript
const cache = {};

app.get("/posts", (req, res) => {
  if (cache.posts) {
    return res.json(cache.posts);
  }

  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" }
  ];

  cache.posts = posts;

  res.json(posts);
});
```

In production systems, caching is usually implemented with tools like Redis.

Caching significantly reduces database load for frequently accessed data.

---

## Best Practices

To maintain good backend performance:
- Avoid returning large datasets
- Use indexes for frequently searched fields
- Enable response compression
- Cache frequently accessed data
- Profile endpoints regularly
- Monitor system metrics

Optimization should focus on real bottlenecks rather than guessing.

---

## What You Learned

By completing Day 29, you can now:
- Identify common backend performance bottlenecks
- Understand how indexing improves database queries
- Recognize the N+1 query problem
- Implement pagination to limit response size
- Enable response compression
- Use caching to reduce repeated work

These techniques help backend systems remain efficient as traffic grows.

---

## Further Reading

- [Node.js Performance Best Practices](https://nodejs.org/en/docs/guides/performance/)
- [Database Indexing Guide](https://use-the-index-luke.com/)
- [Express Compression Middleware](https://expressjs.com/en/resources/middleware/compression.html)
- [Redis Caching Guide](https://redis.io/docs/manual/caching/)
- [k6 Load Testing Tool](https://k6.io/)