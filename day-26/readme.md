# Day 26: Security in Backend Development

Welcome to **Day 26** of the Backend 101 30-day challenge. Today you will learn about one of the most important aspects of backend engineering: **security**.

Backend systems manage sensitive data such as user credentials, personal information, and application logic. If security is ignored, attackers can exploit vulnerabilities and gain access to systems.

In 2017, the credit reporting company Equifax suffered a massive data breach that exposed the personal information of more than 140 million people. The cause was a vulnerability in a web application that had not been patched.

Many real-world breaches happen because backend security was ignored or implemented incorrectly.

By the end of this lesson, you will understand common backend security vulnerabilities and how to protect your APIs using validation, encryption, authentication, and security middleware.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Backend Security Matters](#why-backend-security-matters)
3. [Common Backend Vulnerabilities](#common-backend-vulnerabilities)
4. [OWASP Top 10 Overview](#owasp-top-10-overview)
5. [SQL Injection](#sql-injection)
6. [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
7. [Cross-Site Request Forgery (CSRF)](#cross-site-request-forgery-csrf)
8. [HTTPS and Secure Communication](#https-and-secure-communication)
9. [Input Validation and Sanitization](#input-validation-and-sanitization)
10. [Password Hashing](#password-hashing)
11. [API Authentication with JWT](#api-authentication-with-jwt)
12. [Hands-on: Securing an Express API](#hands-on-securing-an-express-api)
13. [Core Security Rules](#core-security-rules)
14. [Backend Security Checklist](#backend-security-checklist)
15. [What You Learned](#what-you-learned)
16. [Further Reading](#further-reading)

---

## Introduction

When building backend systems, functionality alone is not enough. Applications must also protect users and data from malicious activity.

Backend systems often manage:
- **User authentication**
- **Database access**
- **File uploads**
- **Payment processing**

If security vulnerabilities exist, attackers may be able to:
- Steal data
- Modify records
- Gain unauthorized access
- Crash or disrupt services

Understanding security principles helps developers build safer and more resilient backend systems.

---

## Why Backend Security Matters

Even simple APIs can be exploited if security practices are ignored.

### Examples:
- An attacker could inject malicious SQL into a login form.
- A malicious script might execute in another user’s browser.
- An attacker could trick authenticated users into performing unwanted actions.

Security practices help reduce these risks and protect both systems and users.

---

## Common Backend Vulnerabilities

Some security problems appear repeatedly in backend applications.

### Common Examples Include:
- **SQL Injection**
- **Cross-Site Scripting (XSS)**
- **Cross-Site Request Forgery (CSRF)**
- **Broken authentication**
- **Sensitive data exposure**
- **Security misconfiguration**

To help developers understand these threats, the security community maintains a widely used reference called the **OWASP Top 10**.

---

## OWASP Top 10 Overview

**OWASP (Open Web Application Security Project)** publishes a list of the most critical security risks for web applications.

### The OWASP Top 10 Includes Issues Such As:
- Injection attacks
- Broken authentication
- Security misconfiguration
- Sensitive data exposure
- Insufficient logging and monitoring

Backend developers should understand these vulnerabilities and how to prevent them.

---

## SQL Injection

**SQL Injection** occurs when attackers insert malicious SQL statements into application input fields.

### Vulnerable Code:
```javascript
const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
```

An attacker could submit input like:
```
' OR '1'='1
```

This could bypass authentication.

### Secure Version:
```javascript
const query = "SELECT * FROM users WHERE email = ? AND password = ?";
db.execute(query, [email, password]);
```

Using **parameterized queries** prevents user input from modifying SQL structure.

---

## Cross-Site Scripting (XSS)

**Cross-Site Scripting** occurs when attackers inject malicious scripts into web pages viewed by other users.

### Example Scenario:
A comment form allows users to submit JavaScript code instead of plain text.

If the backend does not sanitize input, that script may execute in other users' browsers.

### Prevention Techniques Include:
- Sanitizing user input
- Escaping HTML output
- Using security headers

---

## Cross-Site Request Forgery (CSRF)

**CSRF attacks** trick authenticated users into performing unintended actions.

### Example:
A user logs into a website and remains authenticated. An attacker sends them a malicious link that triggers a request to the backend using their credentials.

This could cause actions such as:
- Changing account settings
- Making purchases
- Deleting data

### Prevention Techniques Include:
- **CSRF tokens**
- **SameSite cookies**
- **Authentication checks for sensitive endpoints**

---

## HTTPS and Secure Communication

HTTP traffic can be intercepted if it is not encrypted.

**HTTPS** encrypts communication between the client and server using TLS.

### Benefits of HTTPS Include:
- Protection against data interception
- Integrity of transmitted data
- Improved user trust

Production systems should always use HTTPS. Many cloud providers automatically provide certificates through services such as **Let's Encrypt**.

---

## Input Validation and Sanitization

Backend systems should never trust user input.

### All Incoming Data Should Be Validated:
- Email addresses must follow valid formats
- Passwords must meet length requirements
- Numbers should not contain unexpected characters

**Sanitization** removes potentially dangerous content from input before it reaches application logic.

Validation and sanitization help prevent injection attacks.

---

## Password Hashing

Passwords should never be stored as plain text.

If a database is compromised and passwords are stored directly, attackers immediately gain access to user accounts.

Instead, passwords should be hashed using secure algorithms.

### Example Using bcrypt:
```javascript
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash(password, 10);
```

When users log in, the submitted password is compared against the stored hash.

Hashing ensures that even if the database leaks, the original passwords remain protected.

---

## API Authentication with JWT

Many APIs use **JSON Web Tokens (JWT)** to authenticate users.

After a user logs in successfully, the backend generates a token that the client sends with future requests.

### Example:
```javascript
import jwt from "jsonwebtoken";

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
```

Protected routes verify the token before allowing access. This ensures that only authenticated users can access restricted endpoints.

---

## Hands-on: Securing an Express API

### Step 1: Install Security Libraries
```bash
npm install helmet express-validator cors
```

### Step 2: Enable Security Headers
```javascript
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
```

**Helmet** adds security headers that help protect against common attacks such as:
- Clickjacking
- Cross-site scripting
- Content sniffing

### Step 3: Validate User Input Before Processing Requests

Use validation libraries to ensure incoming data is safe.

**Example using express-validator:**
```javascript
import { body, validationResult } from "express-validator";

app.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("User input is valid");
  }
);
```

This ensures requests contain properly formatted data before reaching your application logic.

### Step 4: Hash User Passwords Before Storing Them

Never store passwords in plain text.

**Example using bcrypt:**
```javascript
import bcrypt from "bcrypt";

const password = req.body.password;

const hashedPassword = await bcrypt.hash(password, 10);

// store hashedPassword in database
```

When the user logs in:
```javascript
const match = await bcrypt.compare(password, user.passwordHash);
```

This protects user credentials even if the database is compromised.

### Step 5: Protect Sensitive Routes with Authentication Middleware

Use authentication tokens to protect API endpoints.

**Example using JWT:**
```javascript
import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

// Protect routes like this:
app.get("/profile", authenticate, (req, res) => {
  res.send("Protected user data");
});
```

These steps help enforce secure defaults in backend applications.

---

## Core Security Rules

1. **Never trust user input**
2. **Encrypt sensitive data**
3. **Validate every request**
4. **Store secrets securely**

Following these rules significantly reduces the risk of common backend vulnerabilities.

---

## Backend Security Checklist

Before deploying your API, ensure:
- HTTPS is enabled
- Passwords are hashed
- Input validation is implemented
- Security headers are enabled
- Authentication protects sensitive routes
- Secrets are stored in environment variables

This checklist helps prevent many common security mistakes.

---

## What You Learned

By completing Day 26, you can now:
- Understand common backend security vulnerabilities
- Recognize the importance of the OWASP Top 10
- Protect APIs using validation and sanitization
- Hash passwords securely
- Implement authentication using JWT
- Apply security best practices when building backend systems

Security is an ongoing process, and developers must continuously review and improve their systems to protect against new threats.

---

## Further Reading

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Academy by PortSwigger](https://portswigger.net/web-security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Guidelines](https://expressjs.com/en/advanced/best-practice-security.html)