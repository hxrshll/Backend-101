
# Day 19: API Rate Limiting & Throttling

Welcome to Day 19 of the Backend 101 30-day challenge. Today is all about protecting your backend from abuse, whether it is malicious attacks like DDoS or unintentional overuse such as someone accidentally looping API calls.

By the end of this lesson, you will understand how rate limiting works, how big platforms enforce limits, and how to implement it in Express.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Rate Limiting Is Needed](#why-rate-limiting-is-needed)
3. [Throttling vs Rate Limiting](#throttling-vs-rate-limiting)
4. [Token Bucket vs Leaky Bucket](#token-bucket-vs-leaky-bucket)
5. [Types of Rate Limits](#types-of-rate-limits)
6. [Hands-on: Add Rate Limiting in Express](#hands-on-add-rate-limiting-in-express)
7. [Optional: Build a Simple Token Bucket](#optional-build-a-simple-token-bucket)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Further Reading](#further-reading)

---

## Introduction

Every backend, no matter how small, needs some form of traffic control.

Without limits:
- A bug in your frontend could flood your own API
- Hackers could brute-force login endpoints
- Free-tier users could overload your servers

Rate limiting is like saying:
> "You can enter, but only at this speed."

---

## Why Rate Limiting Is Needed

| Scenario                        | Problem             | Solution                |
|----------------------------------|---------------------|-------------------------|
| User keeps refreshing quickly    | Server overload     | Limit per IP            |
| Bot tries passwords repeatedly   | Brute-force attack  | Limit per route         |
| Free-tier users abusing API      | Resource exhaustion | Limit per user/token    |

---

## Throttling vs Rate Limiting

| Term         | Meaning                                 | Example                                         |
|--------------|-----------------------------------------|-------------------------------------------------|
| Rate Limiting| Hard cap, requests rejected after limit  | "100 requests per hour. After that: 429 Too Many Requests" |
| Throttling   | Slow down instead of block              | "After 100 requests, delay responses by 1 second each"      |

---

## Token Bucket vs Leaky Bucket

| Feature      | Token Bucket                                         | Leaky Bucket                                 |
|--------------|-----------------------------------------------------|-----------------------------------------------|
| How it works | You get tokens at a fixed rate. Each request uses 1 token | Requests enter a queue, processed at fixed rate |
| Burst allowed| Yes, if tokens are saved                            | No, strict and steady flow                    |
| Good for     | APIs that allow short bursts                        | Consistent traffic flow (streaming)           |

---

## Types of Rate Limits

| Type           | Applies To         | Example                                      |
|----------------|-------------------|----------------------------------------------|
| Global         | All users combined| "Only 10,000 requests per minute for entire API" |
| Per-IP         | Each client IP    | "100 requests per hour per IP"               |
| Per-User/Token | Authenticated users| "Free users: 60 req/min, Premium: 600 req/min" |

---

## Hands-on: Add Rate Limiting in Express

**Install:**

```bash
npm install express-rate-limit
```

**Apply globally:**

```js
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 100,                  // 100 requests per IP
  message: { error: 'Too many requests, please slow down.' }
});

app.use(limiter); // apply to all routes

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000);
```

**Apply only to sensitive routes (optional):**

```js
app.post('/login', loginLimiter, (req, res) => {...});
```

---

## Optional: Build a Simple Token Bucket

```js
let tokens = 10;
const capacity = 10;
const refillRate = 1; // 1 token per second

setInterval(() => {
  tokens = Math.min(capacity, tokens + refillRate);
}, 1000);

function canAccess() {
  if (tokens > 0) {
    tokens--;
    return true;
  }
  return false;
}
```

---

## Bonus Challenges

- Add different limits for `/login` vs `/public` routes
- Log rate limit violations to a file
- Show remaining requests in response headers

---

## What You Learned

By completing Day 19, you can now:

- Explain why rate limits are essential in any backend
- Understand Token Bucket vs Leaky Bucket
- Apply rate limits using Express middleware
- Choose between global, per-IP, or per-user strategies

---

## Further Reading

- [express-rate-limit GitHub](https://github.com/nfriedly/express-rate-limit)
- [Stripe API Rate Limiting Docs](https://stripe.com/docs/rate-limits)
- [Discord Rate Limit System Explained](https://discord.com/developers/docs/topics/rate-limits)
- [Cloudflare: Token Bucket Algorithm](https://developers.cloudflare.com/rate-limits/concepts/token-bucket/)