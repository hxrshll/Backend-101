# Day 13: Caching

Welcome to Day 13 of the Backend 101 30-day challenge. Yesterday, you focused on designing efficient databases. Today, you'll learn how to go one step further by reducing unnecessary database hits and speeding up your app using caching.

By the end of this session, you'll understand what caching is, how it works, and how to implement it in a real-world backend using tools like Redis.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Use Caching?](#why-use-caching)
3. [Types of Caching](#types-of-caching)
4. [TTL and Cache Invalidation](#ttl-and-cache-invalidation)
5. [Caching Strategies](#caching-strategies)
6. [Redis Data Types](#redis-data-types)
7. [Hands-on Setup with Redis](#hands-on-setup-with-redis)
8. [Implementing Caching in an App](#implementing-caching-in-an-app)
9. [Cache Invalidation Examples](#cache-invalidation-examples)
10. [Benchmarking Before and After](#benchmarking-before-and-after)
11. [Practice Tasks](#practice-tasks)
12. [Bonus Challenges](#bonus-challenges)
13. [What You Learned](#what-you-learned)
14. [Further Reading](#further-reading)

---

## Introduction

Caching stores data in a temporary storage layer so it can be accessed faster. Instead of querying the database on every request, your application can return a saved response from the cache — improving speed and reducing load.

Caching is especially useful for:

- Frequently accessed or rarely changing data
- Expensive computations
- Reducing external API calls

---

## Why Use Caching?

**Without caching:**
- Your app hits the database on every request
- Performance drops as user traffic increases
- You pay the cost of computation or I/O every time

**With caching:**
- Response time improves drastically
- You reduce load on the database
- Users get faster access to frequently used data

---

## Types of Caching

| Type               | Description                                 | Common Tools           |
|--------------------|---------------------------------------------|-----------------------|
| In-Memory Cache    | Stores data in app memory (fastest)         | Node.js memory, Python dict |
| Distributed Cache  | Shared cache between multiple servers        | Redis, Memcached      |
| Application Layer  | Stores full HTML or API responses            | Varnish, NGINX, Redis |
| Database Caching   | Database caches query results internally     | PostgreSQL, MySQL     |

---

## TTL and Cache Invalidation

- **TTL (Time To Live):** How long a value stays in the cache before expiring.
  - Example: Cache popular posts for 60 seconds.
- **Invalidation:** Removing or updating stale cache data.
  - Manually (e.g. after updating a post)
  - Automatically via TTL expiration

---

## Caching Strategies

| Strategy       | Description                                 | Use Case              |
|---------------|---------------------------------------------|-----------------------|
| Cache Aside    | App checks cache first, then DB if miss     | Popular posts         |
| Write-Through  | Write to cache and DB simultaneously        | Real-time dashboards  |
| Write-Behind   | Write to cache first, DB later (async)      | High-write systems    |
| Read-Through   | Cache layer handles reads + refreshes       | Data fetching layers  |

 The `getPopularPosts()` example below follows the Cache Aside pattern.

---

## Redis Data Types (Overview)

Redis supports various data structures beyond simple strings:

- **Strings** – Most common, used for caching full responses
- **Hashes** – Ideal for structured key-value pairs (like an object)
- **Lists** – Ordered collections, good for queues
- **Sets** – Unique unordered items
- **Sorted Sets** – Like sets, but with a score (useful for leaderboards)

You can explore these in advanced caching tasks later.

---

## Hands-on Setup with Redis

### Step 1: Install Redis

**macOS**
```sh
brew install redis
brew services start redis
```

**Ubuntu**
```sh
sudo apt update
sudo apt install redis
sudo systemctl start redis
```

Test it:
```sh
redis-cli ping
# Output: PONG
```

### Step 2: Set Up Redis in Node.js
```sh
npm install redis
```

```js
const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect().then(() => {
  console.log('Connected to Redis');
});

module.exports = client;
```

---

## Implementing Caching in Your App

Example: Cache Popular Posts (with error handling)

```js
const client = require('./redis-client');
const Post = require('./models/Post');

async function getPopularPosts() {
  try {
    const cached = await client.get('popular_posts');

    if (cached) {
      console.log('Serving from cache');
      return JSON.parse(cached);
    }

    const posts = await Post.find().sort({ likes: -1 }).limit(5);

    await client.setEx('popular_posts', 60, JSON.stringify(posts)); // cache for 60s
    console.log('Serving from DB and caching');

    return posts;
  } catch (err) {
    console.error('Cache error:', err);
    return await Post.find().sort({ likes: -1 }).limit(5); // fallback to DB
  }
}

module.exports = { getPopularPosts };
```

---

## Cache Invalidation Patterns

It’s important to know how and when to invalidate stale cache.

Common approaches:

- Invalidate on update/delete:
  ```js
  await client.del('popular_posts');
  ```
- Use versioned keys for automatic rollover:
  ```js
  await client.set('popular_posts_v2', data);
  ```
- Invalidate only relevant user/session-level keys:
  ```js
  await client.del(`user:${userId}:profile`);
  ```

---

## Benchmarking Before vs After Caching

Test performance using curl:

```sh
# Before caching
time curl http://localhost:3000/popular-posts

# After enabling cache
time curl http://localhost:3000/popular-posts
```

This helps measure response time improvement after adding cache.

---

## Practice Tasks

- Install Redis and connect it to your app
- Add caching to a frequent or expensive query
- Use TTL to automatically expire cache entries
- Try `.del()` to manually invalidate a key
- Run before/after benchmarks to see performance gain

---

## Bonus Challenges

- Use Redis hashes with HSET and HGET for structured values
- Add Redis-based session storage (e.g., express-session)
- Compare Redis and Memcached for your use case
- Implement write-through or write-behind cache
- Set up a Redis cluster (advanced)

---

## What You Learned

By completing Day 13, you now understand:

- What caching is and why it matters
- Types of caching and real-world tradeoffs
- How to set up Redis and use it in an app
- How TTL and invalidation help manage stale data
- How to apply common caching strategies like Cache Aside
- How caching impacts app performance

---

## Further Reading

- [Redis Documentation](https://redis.io/documentation)
- [Caching Strategies (MDN)](https://developer.mozilla.org/en-US/docs/Web/Performance/Caching)
- [Node Redis Client](https://github.com/redis/node-redis)
- [Martin Fowler on Cache Invalidation](https://martinfowler.com/bliki/CacheInvalidation.html)