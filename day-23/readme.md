# Day 23: CI/CD Pipeline

Welcome to **Day 23** of the Backend 101 30-day challenge. Today you will learn how modern teams automate testing and deployment using CI/CD pipelines.

As projects grow, manually testing and deploying code becomes slow and error-prone. CI/CD pipelines solve this problem by automatically building, testing, and deploying applications whenever code changes.

By the end of this lesson, you will understand how Continuous Integration and Continuous Deployment work, why they are essential for modern software development, and how to create a simple pipeline using GitHub Actions.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is CI/CD](#what-is-cicd)
3. [Continuous Integration](#continuous-integration)
4. [Continuous Deployment](#continuous-deployment)
5. [Why CI/CD Matters](#why-cicd-matters)
6. [CI/CD Workflow Overview](#cicd-workflow-overview)
7. [Introduction to GitHub Actions](#introduction-to-github-actions)
8. [Hands-on: Build Your First Pipeline](#hands-on-build-your-first-pipeline)
9. [Hands-on: Run Tests Automatically](#hands-on-run-tests-automatically)
10. [Hands-on: Build Docker Image in CI](#hands-on-build-docker-image-in-ci)
11. [Optional: Auto Deployment](#optional-auto-deployment)
12. [Common Mistakes](#common-mistakes)
13. [What You Learned](#what-you-learned)
14. [Further Reading](#further-reading)

---

## Introduction

When you are developing alone, the workflow often looks like this:
- Write code
- Run tests locally
- Push to GitHub
- Deploy manually

But real-world teams may have:
- Multiple developers pushing code
- Dozens of commits per day
- Production systems serving thousands of users

Without automation, this leads to:
- Broken builds
- Undetected bugs
- Slow releases
- Manual deployment mistakes

CI/CD automates these processes.

Instead of manually checking everything, the system automatically validates and deploys your code.

---

## What is CI/CD

CI/CD stands for:
- **Continuous Integration**
- **Continuous Deployment** (or **Continuous Delivery**)

It is a development practice where code changes are automatically tested, built, and sometimes deployed.

The goal is to make software delivery:
- **Faster**
- **Safer**
- **More reliable**

---

## Continuous Integration

**Continuous Integration (CI)** means that developers frequently merge code into a shared repository.

Every time new code is pushed:
- The project is built
- Tests are executed
- Errors are detected early

### Example CI Workflow:
1. Developer pushes code
2. CI pipeline starts
3. Tests run
4. Build succeeds or fails

If something breaks, the pipeline fails and developers fix the issue immediately.

### Benefits:
- Detect bugs early
- Prevent broken code from reaching production
- Keep the main branch stable

---

## Continuous Deployment

**Continuous Deployment (CD)** goes one step further.

After the code passes all tests, the system automatically deploys the new version.

### Example CD Workflow:
1. Code pushed
2. Tests pass
3. Build Docker image
4. Deploy to server

This allows teams to ship updates quickly without manual intervention.

Some teams prefer **Continuous Delivery** instead, where deployment still requires manual approval.

---

## Why CI/CD Matters

Modern software teams rely on CI/CD for several reasons:
- Automated testing ensures code quality
- Deployment becomes predictable
- Human error is reduced
- Features ship faster

Large platforms like Netflix, GitHub, and Stripe rely heavily on automated pipelines.

Even small projects benefit from CI/CD because it creates a consistent development workflow.

---

## CI/CD Workflow Overview

A typical pipeline looks like this:
1. Developer pushes code
2. GitHub triggers workflow
3. Dependencies install
4. Tests run
5. Docker image builds
6. Application deploys

Each step is defined in a configuration file that describes how the pipeline should run.

---

## Introduction to GitHub Actions

**GitHub Actions** is a CI/CD platform built directly into GitHub.

It allows you to define automated workflows using YAML configuration files.

### Workflows run when certain events occur, such as:
- A push to the repository
- A pull request
- A scheduled job

The configuration lives inside the repository.

### Example location:
```
.github/workflows/ci.yml
```

Whenever code is pushed, GitHub automatically executes the workflow.

---

## Hands-on: Build Your First Pipeline

### Step 1: Create a Workflow File

Create a new directory in your project:
```
.github/workflows
```

Inside it, create a file:
```
ci.yml
```

### Example Pipeline:
```yaml
name: Backend CI Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: node day-21/.code/tests/signup.test.js
```

Now every push to the main branch will automatically run this pipeline.

---

## Hands-on: Run Tests Automatically

Add additional tests to the workflow.

### Example:
```yaml
- name: Run queue test
  run: node day-21/.code/tests/queue.test.js

- name: Run rate limit test
  run: node day-21/.code/tests/rate-limit.test.js
```

This ensures your backend logic is validated automatically whenever code changes.

---

## Hands-on: Build Docker Image in CI

Since you introduced Docker in Day 22, the pipeline can also build your container image.

### Add a Step:
```yaml
- name: Build Docker image
  run: docker build -t backend101 .
```

This confirms that your Docker configuration works correctly.

Many teams push these images to container registries like:
- **Docker Hub**
- **GitHub Container Registry**
- **AWS ECR**

---

## Optional: Auto Deployment

Some CI/CD pipelines automatically deploy the application.

### Example Deployment Targets:
- **AWS EC2**
- **Railway**
- **Render**
- **DigitalOcean**
- **Kubernetes clusters**

### A Typical Deployment Step Might Look Like:
1. Build Docker image  
2. Push image to registry  
3. SSH into server  
4. Restart containers

Full deployment automation is usually introduced after CI pipelines are stable.

---

## Common Mistakes

- Running pipelines only occasionally instead of on every push
- Skipping automated tests
- Allowing broken builds to be merged
- Hardcoding secrets inside workflow files

> **Tip:** Secrets such as API keys should be stored using GitHub repository secrets.

---

## What You Learned

By completing Day 23, you can now:
- Explain Continuous Integration and Continuous Deployment
- Understand how automated pipelines improve reliability
- Create a GitHub Actions workflow
- Run backend tests automatically on every push
- Build Docker images inside CI pipelines

You have now connected development, testing, and deployment into a single automated workflow.

---

## Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Docker CI/CD Best Practices](https://docs.docker.com/ci-cd/)
- [AWS CI/CD Pipeline Guide](https://aws.amazon.com/devops/continuous-delivery/)