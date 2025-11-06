
# Day 20: Logging and Monitoring

Welcome to Day 20 of the Backend 101 30-day challenge. Today is all about making your backend observable by adding proper logging and real monitoring.

As systems scale, errors become harder to reproduce locally, and performance issues stop being obvious. Logging and monitoring bridge that gap by giving you real-time visibility into what your backend is doing under the hood. They help you detect bugs, understand performance, and catch issues before they impact real users.

By the end of this lesson, you will understand logging levels, structured logs, monitoring tools, tracing basics, and how developers use dashboards and metrics to keep systems healthy in production.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Logging Matters](#why-logging-matters)
3. [Logging Levels](#logging-levels)
4. [Structured vs Unstructured Logs](#structured-vs-unstructured-logs)
5. [What Is Monitoring](#what-is-monitoring)
6. [Metrics You Should Track](#metrics-you-should-track)
7. [Introduction to Tracing](#introduction-to-tracing)
8. [Popular Tools](#popular-tools)
9. [Hands-on: Logging with Winston](#hands-on-logging-with-winston)
10. [Hands-on: Monitoring with Prometheus and Grafana](#hands-on-monitoring-with-prometheus-and-grafana)
11. [Bonus Tasks](#bonus-tasks)
12. [Common Mistakes](#common-mistakes)
13. [What You Learned](#what-you-learned)
14. [Further Reading](#further-reading)

---

## Introduction

When your backend is small, debugging is easy. But as traffic grows and new features stack up, things get chaotic:

- Bugs appear only in production
- Errors depend on specific user flows
- Performance problems become hard to spot
- Logs fill up with noise
- Multiple services start interacting

Logging tells you what happened.
Monitoring tells you how the system behaves over time.

Together, they give you the visibility needed to operate a reliable, scalable, and maintainable backend.

---

## Why Logging Matters

Logging is critical for:

- Debugging issues that you can’t reproduce locally
- Tracking errors over long periods
- Creating audit trails
- Analyzing user behavior
- Understanding failures in distributed systems

Without logs:
> You are guessing.

With logs:
> You are diagnosing with evidence.

---

## Logging Levels

Here’s a complete breakdown of common log levels:

| Level  | Meaning                  | Example                |
|--------|--------------------------|------------------------|
| Trace  | Extremely detailed info  | function start/end     |
| Debug  | Internal debug info      | database query payload |
| Info   | Normal events            | user signup            |
| Warn   | Something unusual but not broken | slow query      |
| Error  | Request failed           | external API timeout   |
| Fatal  | Critical failure         | server crash           |

**Tip:**

- Development: allow trace + debug
- Production: info + warn + error

---

## Structured vs Unstructured Logs

| Type        | Description           | Example                                      |
|-------------|----------------------|----------------------------------------------|
| Unstructured| Plain text           | "DB connection failed"                       |
| Structured  | JSON or key-value    | {"event":"db_fail","retry":true}           |

Unstructured logs are fine for small apps or debugging.
Structured logs scale better since they’re machine-readable and tool-friendly (ELK, Loki, Datadog).

---

## What Is Monitoring

Monitoring tracks the system’s performance and health using metrics. It helps you:

- Track uptime
- Detect performance regressions
- Spot abnormal spikes
- Get alerts when something breaks
- Visualize trends

Logs = snapshots.
Monitoring = trends.

---

## Metrics You Should Track

| Metric         | Description                       |
|--------------- |-----------------------------------|
| Latency        | Time per request (p50, p95, p99)  |
| Error rate     | Number of failed requests         |
| CPU usage      | Server load                       |
| Memory usage   | Leaks or spikes                   |
| Request rate (RPS) | Traffic per second            |
| DB latency     | Slow queries                      |

RPS helps with:

- Load balancing
- Scaling
- Rate limiting

---

## Introduction to Tracing

Tracing shows the full lifecycle of a request as it flows through multiple services:

client → api → auth service → db → cache → response

It helps identify:

- Slow services
- Bottlenecks
- Where failures propagate

Common tools: Jaeger, Zipkin, OpenTelemetry.

---

## Popular Tools

| Category   | Tools                                 |
|------------|---------------------------------------|
| Logging    | Winston, Pino, Morgan, Elastic Stack  |
| Monitoring | Prometheus, Grafana, Datadog, New Relic|
| Tracing    | Jaeger, Zipkin, OpenTelemetry         |

---

## Hands-on: Logging with Winston

**Install:**

```bash
npm install winston winston-daily-rotate-file
```

**Create logger.js:**

```js
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

module.exports = logger;
```

**Use it:**

```js
const express = require('express');
const logger = require('./logger');

const app = express();

app.get('/', (req, res) => {
  logger.info('Home route accessed');
  res.send('Hello');
});

app.get('/error', (req, res) => {
  logger.error('Something broke');
  res.status(500).send('Error');
});

app.listen(3000, () => logger.info('Server running on 3000'));
```

---

## Hands-on: Monitoring with Prometheus and Grafana

**Install client:**

```bash
npm install prom-client
```

**metrics.js:**

```js
const client = require('prom-client');
client.collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in ms',
  buckets: [50, 100, 300, 500, 1000]
});

const httpRequestErrors = new client.Counter({
  name: 'http_request_errors_total',
  help: 'Total number of failed HTTP requests'
});

module.exports = { client, httpRequestDuration, httpRequestErrors };
```

**Add to your app:**

```js
res.on('finish', () => {
  if (res.statusCode >= 400) httpRequestErrors.inc();
});
```

**Expose metrics:**

```js
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
```

**Run Prometheus:**

```bash
./prometheus --config.file=prometheus.yml
```

**Grafana UI:**

http://localhost:3000

Create dashboards for:

- Latency
- Error rate
- Traffic
- CPU/memory

---

## Bonus Tasks

- Add correlation IDs for tracking requests
- Set up Grafana alerting (high latency, high error rate)
- Add DB latency and cache hit-rate metrics
- Integrate basic tracing with OpenTelemetry

---

## Common Mistakes

- Excessive logging in production
- Logging sensitive data
- Not using JSON logs with ELK or Loki
- No log rotation → disk fills up
- Not exposing /metrics
- Not tracking p95 or error rates

---

## What You Learned

You can now:

- Set up structured logging
- Use Winston with log rotation
- Expose metrics using Prometheus
- Visualize performance in Grafana
- Understand logs vs metrics vs traces
- Monitor system health and failures

---

## Further Reading

- [Winston Docs](https://github.com/winstonjs/winston)
- [Elastic Stack](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-elastic-stack.html)
- [Prometheus Docs](https://prometheus.io/docs/introduction/overview/)
- [Grafana Dashboards](https://grafana.com/docs/grafana/latest/dashboards/)
- [OpenTelemetry Docs](https://opentelemetry.io/docs/)