# Day 22: Introduction to Docker

Welcome to **Day 22** of the Backend 101 30-day challenge. Today is about making your backend portable and environment-independent.

So far, your system runs locally using:
- **Node.js**
- **Redis**
- **Separate worker process**

But modern backend systems are rarely deployed manually. They are packaged and run inside containers.

By the end of this lesson, you will understand what Docker is, how containers differ from virtual machines, and how to run your backend system inside containers.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is Docker](#what-is-docker)
3. [What is a Container](#what-is-a-container)
4. [Why Containers Matter](#why-containers-matter)
5. [Containers vs Virtual Machines](#containers-vs-virtual-machines)
6. [Why Companies Use Docker](#why-companies-use-docker)
7. [System Architecture](#system-architecture)
8. [Hands-on: Containerize Your Backend](#hands-on-containerize-your-backend)
9. [Running the System with Docker](#running-the-system-with-docker)
10. [Viewing Container Logs](#viewing-container-logs)
11. [Stopping Containers](#stopping-containers)
12. [What You Learned](#what-you-learned)
13. [Further Practice](#further-practice)

---

## Introduction

As systems grow, consistency becomes a problem.

Different developers may have:
- Different Node versions
- Different operating systems
- Different dependencies

This leads to the classic problem:

> “It works on my machine.”

Docker solves this by packaging your application and its environment together so that it runs the same everywhere.

---

## What is Docker

Docker is a **containerization platform** that lets you package your application along with everything it needs to run.

Instead of manually installing dependencies on every machine, you define them once in a **Dockerfile**.

Docker then builds an image from that configuration and runs it as a container.

---

## What is a Container

A container is a lightweight package that includes:
- **Application code**
- **Runtime** (Node.js, Python, etc.)
- **Dependencies**
- **Configuration**

Think of it like a portable box containing everything your backend needs to run.

If the container runs successfully on your machine, it will run the same way on any other machine with Docker installed.

---

## Why Containers Matter

Containers provide several important benefits:
- **Consistency** across environments
- **Simplified deployments**
- **Isolation** between services
- **Easy scaling**

Instead of installing software manually, you simply run a container.

Your backend now runs the same way on:
- Local machines
- Cloud servers
- CI pipelines

---

## Containers vs Virtual Machines

| **Feature**          | **Virtual Machine**       | **Container**            |
|----------------------|--------------------------|--------------------------|
| **OS**               | Full OS per instance     | Shared host OS           |
| **Startup Time**     | Slow                     | Fast                     |
| **Resource Usage**   | Heavy                    | Lightweight              |
| **Isolation**        | Hardware-level           | Process-level            |
| **Deployment**       | Complex                  | Simple                   |

Containers are significantly lighter and faster, which makes them ideal for backend services.

---

## Why Companies Use Docker

Modern backend systems rarely run as a single process.

Large systems often include multiple components such as:
- **APIs**
- **Background workers**
- **Databases**
- **Caching layers**
- **Message queues**

Docker allows these services to be:
- **Deployed consistently**
- **Scaled independently**
- **Managed easily in production**

Instead of configuring each service manually, engineers run containers that define everything needed to run the system.

---

## System Architecture

In this lesson, you will containerize the backend service from **Day 21**.

The system flow looks like this:

```
User Request
↓
API Container
↓
Redis Queue
↓
Worker Container
```

The API handles incoming requests, pushes jobs into Redis, and the worker processes those jobs asynchronously.

This mirrors the architecture used in many real production systems.

---

## Hands-on: Containerize Your Backend

You will create Docker configurations that run:
- **API server**
- **Worker process**
- **Redis queue**

These services will run together using **Docker Compose**.

### Step 1: Create Dockerfile for the API

Create a Dockerfile that runs the API server.

Example:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", ".code/app.js"]
```

This image installs dependencies and starts your backend server.

### Step 2: Create Dockerfile for the Worker

The worker processes jobs from the queue.

Example:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", ".code/worker.js"]
```

This container runs the background worker.

### Step 3: Create docker-compose.yml

Docker Compose allows multiple containers to run together.

Example configuration:

```yaml
version: "3.9"

services:

  api:
    build:
      context: .
      dockerfile: .code/docker/Dockerfile.api
    ports:
      - "3000:3000"
    depends_on:
      - redis

  worker:
    build:
      context: .
      dockerfile: .code/docker/Dockerfile.worker
    depends_on:
      - redis

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

---

## Running the System with Docker

Run the system using:

```bash
docker compose -f .code/docker/docker-compose.yml up --build
```

Docker will:
- Build the API container
- Build the worker container
- Start the Redis container

Once running, your backend is fully containerized.

### Test the API:

Send a request:

```bash
POST /signup
```

The worker container will process the job asynchronously.

---

## Viewing Container Logs

To inspect what the containers are doing, you can view logs.

- Show logs from all services:

```bash
docker compose logs
```

- Follow logs in real time:

```bash
docker compose logs -f
```

- Show logs only for the worker:

```bash
docker compose logs worker
```

This helps you debug background job processing.

---

## Stopping Containers

To stop all running containers:

```bash
docker compose down
```

This shuts down and removes all containers created by Docker Compose.

---

## What You Learned

By completing Day 22, you can now:
- Understand what Docker and containers are
- Package backend applications into containers
- Run multiple services using Docker Compose
- Debug containerized systems using logs
- Stop and manage containers safely

You also learned how modern backend systems package and deploy services.

---

## Further Practice

Try extending this setup by:
- Adding environment variables
- Persisting Redis data using volumes
- Creating separate development and production builds
- Pushing Docker images to Docker Hub