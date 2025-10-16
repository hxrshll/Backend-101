# Day 15: Web Servers & Reverse Proxies

Welcome to Day 15 of the Backend 101 30-day challenge. Until now, your backend apps have been served directly by Node.js or Flask. But in production, it's more common to place a web server in front of your app, often as a reverse proxy.

By the end of today, you’ll be able to use Nginx to route traffic to your app, understand how reverse proxies work, and troubleshoot common issues.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is a Web Server](#what-is-a-web-server)
3. [What is a Reverse Proxy](#what-is-a-reverse-proxy)
4. [Why Use a Reverse Proxy](#why-use-a-reverse-proxy)
5. [Real-World Example](#real-world-example)
6. [How Nginx Works](#how-nginx-works)
7. [Breaking Down the Config](#breaking-down-the-config)
8. [Hands-on Setup](#hands-on-setup)
9. [Practice Tasks](#practice-tasks)
10. [Bonus Challenges](#bonus-challenges)
11. [Troubleshooting Tips](#troubleshooting-tips)
12. [What You Learned](#what-you-learned)
13. [Further Reading](#further-reading)

---

## Introduction

Running your backend with `node server.js` or `flask run` works during development, but it's not how production deployments are done. In real environments, a web server like Nginx usually handles incoming requests and forwards them to your application server.

This is called a reverse proxy, and it is standard practice for production deployments.

## What is a Web Server

A web server is software that listens for HTTP requests and returns responses. It can serve static files, proxy traffic to dynamic backends, and handle things like SSL, routing, and caching.

Popular examples: Nginx, Apache, Caddy.

## What is a Reverse Proxy

A reverse proxy receives client requests and forwards them to one or more backend servers. It acts as a middle layer between users and your application.

Visual Overview

Client → Nginx (Reverse Proxy) → Node.js or Flask App

The client never interacts directly with your backend. Nginx handles the communication.

## Why Use a Reverse Proxy

| Feature | Description |
|---|---|
| Load Balancing | Distribute traffic across multiple app instances |
| SSL Termination | Handle HTTPS at the proxy instead of the app |
| Static File Serving | Serve static content like CSS or JS directly |
| Request Routing | Forward different paths to different services |
| Security Filtering | Block IPs, rate limit requests, or add filtering rules |
| CORS Avoidance | Use one origin to avoid CORS errors in frontend-backend communication |

## Real-World Example

Imagine you are building a full-stack app with a React frontend and a Flask backend. You want to:

- Serve the React app at `/`
- Proxy API requests to Flask at `/api`

Instead of setting up two separate domains or dealing with CORS, you can do this with Nginx:

```nginx
location / {
    root /var/www/react-app/build;
    index index.html;
}

location /api/ {
    proxy_pass http://localhost:5000;
}
```

Now your entire app runs under the same domain, and Nginx handles the routing.

## How Nginx Works

Nginx uses configuration files (like `/etc/nginx/sites-available/default`) to determine how to respond to HTTP requests. You define server blocks and route specific paths to different backends or files.

## Breaking Down the Proxy Config

Here’s a typical reverse proxy block that forwards all requests to a backend app running on port 3000:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### What Each Line Does

- `proxy_pass http://localhost:3000` — Forwards the request to your backend
- `proxy_http_version 1.1` — Ensures HTTP/1.1 is used, required for WebSockets
- `proxy_set_header Upgrade $http_upgrade` — Allows WebSocket connection upgrades
- `proxy_set_header Connection 'upgrade'` — Also supports WebSocket upgrades
- `proxy_set_header Host $host` — Preserves original request host
- `proxy_cache_bypass $http_upgrade` — Disables cache during WebSocket upgrades

## Hands-on: Set Up Nginx as a Reverse Proxy

### Step 1: Install Nginx

**Ubuntu**
```sh
sudo apt update
sudo apt install nginx
```

**macOS (with Homebrew)**
```sh
brew install nginx
brew services start nginx
```

Visit `http://localhost` in your browser — you should see the Nginx welcome page.

### Step 2: Run a Local App

You can use your Node.js app from Day 7 or your Flask app from Day 10. Run it on a custom port:

```sh
# Node
node server.js  # assumes it listens on port 3000

# Flask
flask run --port=5000
```

### Step 3: Configure Nginx

Edit the default config file:

```sh
sudo nano /etc/nginx/sites-available/default
```

Replace the `location /` block with:

```nginx
location / {
    proxy_pass http://localhost:3000;  # or 5000 for Flask
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Test and restart:

```sh
sudo nginx -t
sudo systemctl restart nginx
```

Now go to `http://localhost` — it should display your app.

## Practice Tasks

Choose one or more:

- Install Nginx and run a local backend on a custom port
- Use Nginx to forward requests from port 80 to your backend
- Add headers to support WebSocket upgrades
- Serve a frontend build (e.g. React or Vue) with Nginx

## Bonus Challenges

These are optional but great for deeper learning:

1. Add HTTPS with Let’s Encrypt

Set up SSL using Certbot. Refer to an official Let's Encrypt setup guide.

2. Load Balance with upstream

```nginx
upstream myapp {
    server localhost:3000;
    server localhost:3001;
}

server {
    listen 80;

    location / {
        proxy_pass http://myapp;
    }
}
```

3. Run Flask with Gunicorn

Flask’s built-in server is not production-ready. Use Gunicorn instead:

```sh
pip install gunicorn
gunicorn app:app --bind 127.0.0.1:5000
```

Then proxy traffic from Nginx to Gunicorn instead of Flask’s dev server.

## Troubleshooting Tips

| Problem | Cause | Solution |
|---|---|---|
| Nginx default page loads | Backend not connected or config missing | Check proxy_pass and app port |
| Nginx restart fails | Syntax error in config | Run `sudo nginx -t` to test config |
| 502 Bad Gateway | App not running or wrong port | Make sure backend is up and reachable |
| Static files not loading | Wrong path or missing root directive | Double-check static file config |

## What You Learned

By completing Day 15, you should now be able to:

- Explain what a reverse proxy is and why it's used
- Configure Nginx to forward traffic to a backend app
- Support WebSocket connections via headers
- Serve frontend and backend apps through a unified setup
- Troubleshoot basic Nginx errors and understand logs

## Further Reading

- [Nginx Beginner’s Guide](https://www.nginx.com/resources/wiki/start/)
- [Nginx as a Reverse Proxy (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-as-a-reverse-proxy)
- [Flask Production Deployment](https://flask.palletsprojects.com/en/latest/deploying/)
- [Node.js Deployment Checklist](https://nodejs.org/en/docs/guides/nodejs-deployment-checklist/)
- [Certbot + Let’s Encrypt Setup](https://certbot.eff.org/)