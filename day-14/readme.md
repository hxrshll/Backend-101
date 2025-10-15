# Day 14: Introduction to API Security and Common Vulnerabilities

Welcome to Day 14 of the Backend 101 30-day challenge. Security is a core part of backend development, and while you've previously looked at authentication using JWTs, it's time to go deeper into the common vulnerabilities that affect APIs and how to prevent them.

By the end of this session, you will understand common security risks in backend APIs, how attackers exploit them, and what practical steps you can take to mitigate them.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Common API Vulnerabilities](#common-api-vulnerabilities)
3. [Basic Security Best Practices](#basic-security-best-practices)
4. [Useful Tools and Middleware](#useful-tools-and-middleware)
5. [Practice Tasks](#practice-tasks)
6. [Bonus Challenges](#bonus-challenges)
7. [What You Learned](#what-you-learned)
8. [Further Reading](#further-reading)

---

## Introduction

APIs are often the primary entry point into backend systems, which makes them common targets for attacks. Security issues usually result from overlooked validations, misconfigurations, or insecure coding practices. Even small mistakes can lead to significant consequences such as data breaches, unauthorized access, or service disruption.

Today’s focus is not on writing full applications, but on understanding and applying core backend security principles to protect your APIs.

---

## Common API Vulnerabilities

Below are the most frequent backend security risks and how they occur.

### SQL Injection
- An attacker injects malicious SQL into a query to manipulate or access unauthorized data.
- Example: `' OR 1=1 --`
- **Fix:** Always use parameterized queries or ORM methods.

### Cross-Site Scripting (XSS)
- Injects JavaScript into front-end pages through backend responses.
- **Fix:** Escape HTML output and sanitize inputs before storing or displaying them.

### Cross-Site Request Forgery (CSRF)
- Tricks an authenticated user’s browser into sending a malicious request.
- **Fix:** Use CSRF tokens, set SameSite cookies, and avoid cookie-based sessions for APIs.

### Broken Authentication
- Weak session handling, missing JWT expiration, or predictable tokens.
- **Fix:** Use strong password hashing, secure session management, and token expiration.

### Insecure Direct Object References (IDOR)
- Exposes internal object IDs without proper access control.
- **Fix:** Always verify ownership or access rights server-side before returning data.

### Excessive Data Exposure
- Returns more data than necessary, such as internal IDs or sensitive fields.
- **Fix:** Return only the fields needed by the client.

---

## Basic Security Best Practices

Follow these principles to build secure APIs:

- Validate and sanitize all user inputs
- Use HTTPS for all client-server communication
- Remove or hide internal headers (e.g., X-Powered-By)
- Return generic error messages in production
- Use secure HTTP headers (e.g., Content-Security-Policy, X-Frame-Options)
- Apply rate limiting to high-risk endpoints
- Use proper logging and monitoring for suspicious activity

---

## Useful Tools and Middleware

Here are some lightweight tools and libraries you can explore:

- **helmet** – Sets security-related HTTP headers (Node.js)
- **express-validator** – Validates and sanitizes request inputs (Node.js)
- **csurf** – Provides CSRF protection via tokens (Express)
- **bleach** – Sanitizes HTML in Python
- **itsdangerous** – Securely signs and verifies data (Python/Flask)
- **OWASP Top 10** – List of the most critical web application security risks

---

## Practice Tasks

Choose one or more of the following:

**Add helmet to your Express app:**
```js
const helmet = require('helmet');
app.use(helmet());
```

**Hide server fingerprinting:**
```js
app.disable('x-powered-by');
```

**Add input validation:**
```js
const { body, validationResult } = require('express-validator');

app.post('/user', [
  body('email').isEmail(),
  body('username').trim().isLength({ min: 3 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  // continue with request
});
```

**Test a vulnerable query with SQL injection and fix it using parameterized queries:**
```js
// Vulnerable:
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;

// Fixed:
db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
```

**Try an XSS payload in an input field and use a sanitization library to clean it:**
```python
import bleach

user_input = '<script>alert("x")</script><b>Hello</b>'
clean = bleach.clean(user_input, tags=['b'])
```

**Implement CSRF protection using csurf middleware:**
```js
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));
```

---

## Bonus Challenges

- Use Postman to simulate a CSRF attack or SQL injection and confirm that your backend is protected
- Implement rate limiting with express-rate-limit:

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

- Sanitize and validate inputs in both the frontend and backend
- Apply CSP and other security headers using Helmet’s configuration options
- Identify potential IDOR issues in your API routes and add access checks

---

## What You Learned

By completing Day 14, you should now be able to:

- Identify and understand common backend security vulnerabilities
- Use simple libraries to protect against XSS, CSRF, SQL injection, and more
- Implement security middleware like helmet and input validators
- Recognize the importance of secure design beyond basic authentication

---

## Further Reading

- [OWASP Top 10](https://owasp.org/Top10)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node Helmet Docs](https://helmetjs.github.io/)
- [express-validator Docs](https://express-validator.github.io/)
- [Python bleach](https://bleach.readthedocs.io/)
- [Flask itsdangerous](https://pythonhosted.org/itsdangerous/)