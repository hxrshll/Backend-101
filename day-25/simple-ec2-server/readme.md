# Launching a Simple EC2 Server

To better understand how cloud deployment works, let’s walk through a simplified example using AWS EC2.

---

## Step 1: Create an AWS Account

Go to the [AWS website](https://aws.amazon.com/) and create a free account if you don’t already have one.

---

## Step 2: Launch an EC2 Instance

1. Open the **AWS Console**.
2. Search for **EC2**.
3. Click **Launch Instance**.
4. Choose the following settings:
   - **Name**: `backend-server`
   - **Operating system**: Ubuntu
   - **Instance type**: `t2.micro` (free tier eligible)

5. When prompted, create or download a **key pair**. This file will allow you to connect to the server securely.
6. Once the instance launches, AWS will provide a **public IP address**.

---

## Step 3: Connect to the Server Using SSH

Open your terminal and run:

```bash
ssh -i your-key.pem ubuntu@your-server-ip
```

### Example:
```bash
ssh -i backend-key.pem ubuntu@54.210.34.10
```

You are now connected to your cloud server.

---

## Step 4: Install Node.js

Inside the server terminal, run:

```bash
sudo apt update
sudo apt install nodejs npm -y
```

### Verify Installation:
```bash
node -v
npm -v
```

---

## Step 5: Deploy Your Backend

1. Clone your project:

```bash
git clone <your-repo-url>
cd project
npm install
node app.js
```

2. Your backend is now running on the cloud server.

### Access the API:
If your server has a public IP, you can access the API from your browser:

```
http://your-server-ip:3000
```

---

## What Just Happened

You just simulated a very common deployment pattern:

```
Client Request
↓
Internet
↓
Cloud Server (EC2)
↓
Node.js API
```

This is the basic foundation of many backend deployments.

In larger systems, this server might also run:
- **Docker containers**
- **Reverse proxies (Nginx)**
- **Load balancers**
- **Monitoring services**

---

## Why This Matters

Understanding how to launch and connect to a cloud server helps you understand how backend systems move from **development → production**.

Many modern deployment tools such as:
- **Docker**
- **Kubernetes**
- **Render**
- **Railway**

are built on top of these same cloud infrastructure concepts.