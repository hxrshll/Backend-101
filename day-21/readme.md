# Day 21: Recap and Mini Project

Welcome to **Day 21** of the Backend 101 30-day challenge. Over the past few days, you explored how modern backend systems scale, protect themselves, and stay observable.

## You Learned About:
- **Microservices and async processing**
- **Background queues**
- **Rate limiting**
- **Logging and monitoring**

Today is about bringing all of those concepts together into one cohesive backend mini project.

By the end of this lesson, you will build a small service that demonstrates how real production systems handle requests asynchronously, protect endpoints from abuse, and expose system health through metrics.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Concepts Applied](#concepts-applied)
4. [System Flow](#system-flow)
5. [Hands-on: Build the Mini Service](#hands-on-build-the-mini-service)
6. [Testing the System](#testing-the-system)
7. [Bonus Extensions](#bonus-extensions)
8. [What You Learned](#what-you-learned)
9. [Further Practice](#further-practice)

---

## Introduction

Learning backend concepts individually is useful. Real backend engineering happens when these ideas work together.

A production system does not:
- Process everything synchronously
- Trust unlimited client traffic
- Run without visibility

Instead, it:
- Delegates heavy work to background jobs
- Protects critical endpoints
- Tracks system behavior over time

Today’s goal is to combine these ideas into one small but realistic backend service.

---

## Project Overview

You will build a **signup service** that:
- Accepts user requests
- Rate limits incoming traffic
- Queues background email processing
- Processes jobs asynchronously
- Exposes monitoring metrics

Instead of doing everything instantly inside the API, the system will push work to a queue and let a worker process it in the background.

---

## Concepts Applied

| **Concept**         | **Role in Project**                  |
|---------------------|-------------------------------------|
| **Async Processing** | Email handled in background         |
| **Queue System**     | Redis + Bull                        |
| **Rate Limiting**    | Protects signup endpoint            |
| **Monitoring**       | Tracks system usage                 |
| **Worker Separation**| Simulates microservice behavior     |

---

## System Flow

1. Client sends signup request
2. API checks rate limit
3. API logs request
4. API pushes job to queue
5. Worker processes job asynchronously
6. Metrics track request activity

---

## Hands-on: Build the Mini Service

### Step 1: Rate-Limited Signup Endpoint

Create a **POST** route:

```
POST /signup
```

Apply rate limiting to prevent abuse.

### Step 2: Add Async Processing

Instead of sending emails immediately, push a job into the queue. The worker processes it in the background.

### Step 3: Add Monitoring

Expose:

```
GET /metrics
```

This tracks:
- Request counts
- System health
- Runtime behavior

### Step 4: Worker Processing

The worker runs separately and handles queued jobs without blocking the API.

---

## Testing the System

You tested:
- Signup flow
- Rate limit enforcement
- Queue behavior

### Example Outcomes:

**Successful request:**
```json
200 OK
{
  "message": "Queued"
}
```

**After exceeding limits:**
```json
429 Too Many Requests
```

**Metrics output:**
```
signup_requests_total 12
```

---

## Bonus Extensions

- Add retry logic for failed jobs
- Add structured logging
- Track job success rates
- Add per-user rate limits

---

## What You Learned

By completing Day 21, you can now:
- Build async backend workflows
- Protect endpoints with rate limiting
- Use queues for background processing
- Expose monitoring metrics
- Design request flow beyond simple CRUD

You moved from learning tools to combining systems.

---

## Further Practice

Try extending this service to:
- Handle file uploads
- Process payments asynchronously
- Send scheduled notifications
- Add tracing to follow request paths