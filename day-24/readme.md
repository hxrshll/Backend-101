# Day 24: Horizontal and Vertical Scaling

Welcome to **Day 24** of the Backend 101 30-day challenge. Today you will learn how backend systems handle increasing traffic and growing workloads.

As applications grow, a single server often becomes insufficient. More users mean more requests, more database queries, and more processing.

Backend systems solve this problem through **scaling**.

By the end of this lesson, you will understand the difference between vertical and horizontal scaling, how load balancers distribute traffic, and how large systems scale reliably.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Scaling Matters](#why-scaling-matters)
3. [Vertical Scaling](#vertical-scaling)
4. [Horizontal Scaling](#horizontal-scaling)
5. [Load Balancing](#load-balancing)
6. [CAP Theorem](#cap-theorem)
7. [Trade-offs in Distributed Systems](#trade-offs-in-distributed-systems)
8. [Hands-on: Simulating Load](#hands-on-simulating-load)
9. [Hands-on: Running Multiple API Instances](#hands-on-running-multiple-api-instances)
10. [Hands-on: Load Balancing with Nginx](#hands-on-load-balancing-with-nginx)
11. [Common Mistakes](#common-mistakes)
12. [What You Learned](#what-you-learned)
13. [Further Reading](#further-reading)

---

## Introduction

When you first build an API, it usually runs on a single server.

For example:
```
User → API server → Database
```

This works fine when traffic is small.

But imagine thousands of users sending requests at the same time. The server may become slow or even crash.

To solve this problem, systems **scale**.

Scaling means increasing the system's ability to handle more requests.

---

## Why Scaling Matters

As traffic grows, systems may experience:
- Higher request volume
- Longer response times
- CPU and memory bottlenecks
- Server crashes under load

Scaling helps maintain:
- **Performance**
- **Reliability**
- **Availability**

Modern systems are designed with scaling in mind from the beginning.

---

## Vertical Scaling

**Vertical scaling** means increasing the resources of a single server.

Instead of adding more machines, you upgrade the existing one.

### Examples:
- Increase CPU cores
- Add more RAM
- Upgrade disk performance

### Example:
A server with:
- 2 CPU cores
- 4 GB RAM

can be upgraded to:
- 8 CPU cores
- 32 GB RAM

### Advantages:
- Simple to implement
- No architectural changes required

### Limitations:
- Hardware has limits
- Upgrades can be expensive
- Still a single point of failure

If the server crashes, the entire application goes down.

---

## Horizontal Scaling

**Horizontal scaling** means adding more servers instead of upgrading one.

Instead of:
```
User → 1 server
```

you get:
```
User → Load Balancer → multiple servers
```

Each server handles a portion of the traffic.

### Advantages:
- Better fault tolerance
- Higher scalability
- No single machine bottleneck

### Limitations:
- More complex architecture
- Requires load balancing
- State management becomes harder

Many modern systems prefer horizontal scaling because it allows applications to grow almost indefinitely.

---

## Load Balancing

When multiple servers exist, requests must be distributed between them.

This is done using a **load balancer**.

### Example:
```
User Request
↓
Load Balancer
↓
Server A
Server B
Server C
```

The load balancer decides which server handles each request.

### Common Strategies Include:
- **Round robin**
- **Least connections**
- **IP hashing**

### Popular Load Balancers:
- **Nginx**
- **HAProxy**
- **Cloud load balancers** (AWS, GCP, Azure)

Load balancers also improve reliability because if one server fails, traffic can be redirected to others.

---

## CAP Theorem

When systems scale horizontally and become distributed, new challenges appear.

One important concept is the **CAP Theorem**.

CAP states that distributed systems can guarantee only two of the following three properties:
- **Consistency**
- **Availability**
- **Partition tolerance**

### Definitions:
- **Consistency**: Every node returns the same data.
- **Availability**: The system always responds to requests.
- **Partition tolerance**: The system continues working even if network communication between nodes fails.

In practice, systems must choose trade-offs depending on their requirements.

---

## Trade-offs in Distributed Systems

Different systems prioritize different properties.

### Examples:
- **Banking systems** prioritize consistency.
- **Social media platforms** often prioritize availability.

Understanding these trade-offs helps engineers design systems that behave correctly under load.

---

## Hands-on: Simulating Load

Before scaling, it helps to see how a system behaves under stress.

A common tool for this is **Apache Bench**.

### Install Apache Bench:
Ubuntu / Linux:
```bash
sudo apt install apache2-utils
```

### Run a Simple Test:
```bash
ab -n 1000 -c 50 http://localhost:3000/signup
```

### Explanation:
- `-n` = total requests
- `-c` = concurrent requests

This sends 1000 requests with 50 running at the same time.

You can observe how your API behaves under load.

---

## Hands-on: Running Multiple API Instances

Instead of running one API instance, you can run multiple.

### Example with Node:
```bash
node app.js
node app.js
node app.js
```

Each instance can run on a different port.

### Example:
- 3001
- 3002
- 3003

Now multiple servers are available to handle requests.

---

## Hands-on: Load Balancing with Nginx

Create an **Nginx configuration** that forwards requests to multiple backend servers.

### Example Configuration:
```nginx
http {
  upstream backend {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
  }

  server {
    listen 8080;

    location / {
      proxy_pass http://backend;
    }
  }
}
```

Now requests sent to port 8080 will be distributed across the backend servers.

---

## Common Mistakes

- Trying to scale before measuring system limits
- Running multiple instances without a load balancer
- Ignoring database bottlenecks
- Storing session state in a single server when scaling horizontally
- Not monitoring system performance during scaling

---

## What You Learned

By completing Day 24, you can now:
- Explain the difference between vertical and horizontal scaling
- Understand how load balancers distribute traffic
- Simulate traffic using load testing tools
- Run multiple backend instances
- Understand the CAP theorem and distributed system trade-offs

These concepts are fundamental for designing systems that handle real-world traffic.

---

## Further Reading

- [Nginx Load Balancing Documentation](https://nginx.org/en/docs/)
- [Apache Bench Documentation](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [CAP Theorem by Eric Brewer](https://en.wikipedia.org/wiki/CAP_theorem)
- *Designing Data-Intensive Applications* – Martin Kleppmann