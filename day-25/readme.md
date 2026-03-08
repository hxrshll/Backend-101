# Day 25: Cloud Services

Welcome to **Day 25** of the Backend 101 30-day challenge. So far, you have learned how to build APIs, containerize them with Docker, automate workflows using CI/CD, and understand how systems scale.

The next step is running your backend in the cloud.

Modern backend systems rarely run on a single developer machine or local server. Instead, they are deployed on cloud platforms that provide compute resources, storage, networking, and managed services.

By the end of this lesson, you will understand the basics of cloud platforms and deploy your backend service to a real server.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is Cloud Computing](#what-is-cloud-computing)
3. [Major Cloud Providers](#major-cloud-providers)
4. [Core Cloud Services](#core-cloud-services)
5. [Compute Services](#compute-services)
6. [What is AWS EC2](#what-is-aws-ec2)
7. [What is SSH](#what-is-ssh)
8. [Storage Services](#storage-services)
9. [Managed Databases](#managed-databases)
10. [Hands-on: Deploying to a Cloud Server](#hands-on-deploying-to-a-cloud-server)
11. [Hands-on: File Storage with Object Storage](#hands-on-file-storage-with-object-storage)
12. [Common Mistakes](#common-mistakes)
13. [What You Learned](#what-you-learned)
14. [Further Reading](#further-reading)

---

## Introduction

Up until now, your backend probably runs locally:
```
Client → localhost → API → Database
```

This works during development, but real applications must be accessible from anywhere on the internet.

Cloud platforms provide infrastructure that allows developers to deploy applications globally without managing physical servers.

Instead of buying hardware and setting up data centers, developers can rent resources on demand.

---

## What is Cloud Computing

**Cloud computing** means delivering computing services over the internet.

These services can include:
- **Virtual machines**
- **Storage systems**
- **Databases**
- **Networking infrastructure**
- **Monitoring tools**

Instead of running software on your own machine, it runs on remote infrastructure managed by cloud providers.

This allows systems to scale easily and remain available worldwide.

---

## Major Cloud Providers

Several major companies provide cloud infrastructure.

### Common Providers Include:
- **AWS (Amazon Web Services)**
- **Google Cloud Platform (GCP)**
- **Microsoft Azure**

### Simpler Platforms for Developers:
- **Render**
- **Railway**
- **Fly.io**
- **Vercel**

These platforms simplify deployment by handling infrastructure setup automatically.

---

## Core Cloud Services

Most cloud platforms provide three core types of services:

1. **Compute**
2. **Storage**
3. **Databases**

Together, these form the foundation of modern backend systems.

---

## Compute Services

**Compute services** provide the servers that run your application.

### Example Services:
- **AWS EC2**
- **Google Compute Engine**
- **Azure Virtual Machines**

These services allow you to run backend applications just like a normal server.

### Typical Workflow:
1. Create a virtual machine
2. Install runtime dependencies
3. Deploy your backend code
4. Expose the server to the internet

In production systems, containers and orchestration tools are often used to manage compute resources efficiently.

---

## What is AWS EC2

**EC2 (Elastic Compute Cloud)** is a service provided by AWS that allows you to run virtual servers in the cloud.

Instead of buying a physical computer to run your backend, you can rent a virtual machine from AWS and run your application there.

An EC2 instance is essentially a remote computer that you can access over the internet.

You can install software, run programs, and deploy applications just like you would on your own machine.

---

## What is SSH

**SSH (Secure Shell)** is a protocol used to connect to remote machines securely.

It allows you to open a terminal session on another computer over the internet.

### Example Flow:
```
Your laptop → SSH → Cloud server
```

Once connected, you can run commands on the remote server as if you were using it directly.

### Example Command:
```bash
ssh ubuntu@your-server-ip
```

This connects your terminal to the remote server.

---

## Storage Services

Cloud platforms also provide **object storage services** for files and media.

### Examples:
- **AWS S3**
- **Google Cloud Storage**
- **Azure Blob Storage**

These services store files such as:
- **Images**
- **Videos**
- **Backups**
- **Documents**

Unlike traditional databases, object storage is optimized for storing large files reliably and cheaply.

Many applications store uploaded files in object storage rather than directly on servers.

---

## Managed Databases

Running databases manually can be complex.

Cloud providers offer **managed database services** that handle:
- **Backups**
- **Replication**
- **Scaling**
- **Security updates**

### Examples Include:
- **AWS RDS**
- **Google Cloud SQL**
- **Azure Database Services**

Using managed databases allows developers to focus on application logic rather than infrastructure management.

---

## Hands-on: Deploying to a Cloud Server

One common approach is deploying your backend to a virtual machine such as an AWS EC2 instance.

### Example Workflow:
1. Create an EC2 instance on AWS
2. Connect to the server using SSH
3. Install Node.js and dependencies
4. Clone your project repository
5. Start the application

### Example Commands on the Server:
```bash
git clone <your-repo>
cd project
npm install
node app.js
```

Your backend is now running on a remote server.

If the server has a public IP address, your API can be accessed over the internet.

> **Note:** If AWS feels complex for beginners, platforms like Render or Railway provide simpler deployment workflows where you can deploy directly from GitHub.

---

## Hands-on: File Storage with Object Storage

Instead of storing files on your backend server, they can be uploaded to **object storage**.

### Example Flow:
1. Client uploads file
2. API receives request
3. API uploads file to S3
4. File URL returned to client

Object storage services handle scaling and reliability automatically.

This approach is commonly used for:
- **Profile pictures**
- **Media uploads**
- **Application backups**

---

## Common Mistakes

- Deploying applications without proper environment configuration
- Hardcoding credentials in application code
- Ignoring server security updates
- Running production workloads without monitoring
- Uploading large files directly to backend servers instead of object storage

---

## What You Learned

By completing Day 25, you can now:
- Understand the basics of cloud computing
- Identify the core services provided by cloud platforms
- Understand what EC2 and SSH are used for
- Deploy backend applications to remote servers
- Use cloud storage for handling files

Recognize how cloud infrastructure supports scalable backend systems.

---

## Further Reading

- [AWS Getting Started Guide](https://aws.amazon.com/getting-started/)
- [Google Cloud Fundamentals](https://cloud.google.com/docs/overview)
- [Azure Cloud Documentation](https://learn.microsoft.com/en-us/azure/)
- [Introduction to Cloud Computing by IBM](https://www.ibm.com/cloud/learn/cloud-computing)