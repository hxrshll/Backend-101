# Day 28: API Documentation and Versioning

Welcome to **Day 28** of the Backend 101 30-day challenge. Today you will learn how to document your APIs and manage changes using **versioning**.

As backend systems grow, APIs are often consumed by multiple clients such as web applications, mobile apps, and third-party services. Without clear documentation, developers struggle to understand how endpoints work, what data should be sent, and what responses to expect.

Companies like Stripe, GitHub, and Twilio provide extremely detailed API documentation. Their APIs are widely adopted partly because developers can quickly understand how to integrate them.

By the end of this lesson, you will understand why API documentation is important, how API versioning works, and how to generate interactive documentation using **Swagger**.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why API Documentation Matters](#why-api-documentation-matters)
3. [What Should API Documentation Include](#what-should-api-documentation-include)
4. [OpenAPI and Swagger](#openapi-and-swagger)
5. [Hands-on: Add Swagger Documentation](#hands-on-add-swagger-documentation)
6. [Documenting API Routes with Swagger](#documenting-api-routes-with-swagger)
7. [Understanding Swagger UI](#understanding-swagger-ui)
8. [API Versioning Explained](#api-versioning-explained)
9. [When to Create a New API Version](#when-to-create-a-new-api-version)
10. [Common Versioning Strategies](#common-versioning-strategies)
11. [Hands-on: Add Versioning to an API](#hands-on-add-versioning-to-an-api)
12. [Deprecating Old API Versions](#deprecating-old-api-versions)
13. [Best Practices](#best-practices)
14. [What You Learned](#what-you-learned)
15. [Further Reading](#further-reading)

---

## Introduction

When you build an API, you know how it works because you wrote it.

But other developers do not.

Without documentation they must:
- Read your source code
- Guess request formats
- Test endpoints blindly
- Figure out error responses

Good documentation removes this confusion and makes your API easier to use.

Large developer platforms treat API documentation as part of the product itself. Many developers adopt APIs specifically because the documentation is clear and easy to follow.

---

## Why API Documentation Matters

API documentation explains how clients should interact with your backend.

It typically describes:
- Available endpoints
- Request parameters
- Request body formats
- Response structures
- Authentication requirements
- Possible error responses

### Benefits Include:
- Faster onboarding for developers
- Less confusion during integration
- Reduced debugging time
- Better long-term maintainability

A well-documented API can dramatically improve developer experience.

---

## What Should API Documentation Include

A typical API documentation describes the following:

| **Component**   | **Description**                     |
|------------------|-------------------------------------|
| **Endpoint**     | URL path for the API               |
| **Method**       | HTTP method (GET, POST, etc.)      |
| **Parameters**   | Query parameters or path variables |
| **Request Body** | Data sent in the request           |
| **Response**     | Example response data              |
| **Status Codes** | Possible response codes            |
| **Authentication** | Required tokens or credentials |

### Example Endpoint Documentation:

**POST /api/v1/signup**

#### Request Body Example:
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

#### Response Example:
```json
{
  "message": "User created"
}
```

---

## OpenAPI and Swagger

API documentation tools usually follow a standard format.

The most widely used one is the **OpenAPI Specification**.

- **OpenAPI** is a standardized format used to describe REST APIs in a machine-readable way.
- **Swagger** is a set of tools that work with the OpenAPI specification to generate documentation interfaces and testing environments.

### In Simple Terms:
- **OpenAPI** = the specification
- **Swagger** = tools that implement the specification

Using Swagger tools, you can generate interactive documentation directly from your API code.

---

## Hands-on: Add Swagger Documentation

### Step 1: Install Required Packages

```bash
npm install swagger-ui-express swagger-jsdoc
```

### Step 2: Create a Basic Swagger Configuration

```javascript
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend 101 API",
      version: "1.0.0",
      description: "API documentation for Backend 101 project"
    }
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
```

### Step 3: Start the Server and Open Swagger UI

After starting the server, open:

```
http://localhost:3000/docs
```

You will see a Swagger documentation interface for your API.

---

## Documenting API Routes with Swagger

Swagger allows you to describe endpoints directly in code using comments.

### Example:

```javascript
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
```

This comment allows Swagger to automatically generate documentation for the endpoint.

When the server runs, Swagger reads these comments and builds documentation automatically.

This keeps documentation close to the actual code.

---

## Understanding Swagger UI

When you open the Swagger UI page, you will see:
- A list of available API endpoints
- Expandable sections for each endpoint
- Request parameter details
- Example request bodies
- Example responses
- A **Try it out** button that lets you test endpoints directly from the browser

This interactive interface allows developers to experiment with APIs without writing any client code.

---

## API Versioning Explained

APIs evolve over time.

New features may be added, response formats may change, and older endpoints may need to be replaced.

Without versioning, these changes can break existing applications that rely on the API.

**API versioning** solves this problem by maintaining multiple versions.

### Example:
- `/api/v1/users`
- `/api/v2/users`

Older clients continue using version 1 while newer clients migrate to version 2.

---

## When to Create a New API Version

Not every change requires a new API version.

### Create a New Version When:
- Response formats change
- Fields are removed or renamed
- Authentication methods change
- Endpoint behavior changes

### Minor Additions Usually Do Not Require a New Version:
- Adding optional fields
- Adding new endpoints
- Adding optional parameters

These changes are usually backward compatible.

---

## Common Versioning Strategies

Several versioning strategies exist.

| **Strategy**       | **Example**                     |
|---------------------|---------------------------------|
| **URL Versioning**  | `/api/v1/users`                |
| **Header Versioning** | `Accept: application/vnd.api.v1` |
| **Query Versioning** | `/users?version=1`             |

The most common and beginner-friendly approach is **URL versioning**.

### Example:
- `GET /api/v1/posts`
- `GET /api/v2/posts`

---

## Hands-on: Add Versioning to an API

Instead of defining routes like this:

```javascript
app.get("/users", getUsers);
```

Use a versioned prefix:

```javascript
app.use("/api/v1", userRoutes);
```

### Example Endpoints:
- `GET /api/v1/users`
- `POST /api/v1/users`

Later you can create:
- `/api/v2/users`

without breaking existing integrations.

---

## Deprecating Old API Versions

Over time, older versions of an API become outdated.

Instead of removing them immediately, they are usually deprecated first.

### Typical Deprecation Process:
1. Announce deprecation
2. Provide migration documentation
3. Allow transition period
4. Remove outdated version

Many APIs also include response headers warning developers about deprecated versions.

---

## Best Practices

When documenting APIs and managing versions:
- Keep documentation updated with code changes
- Provide clear request and response examples
- Avoid breaking changes when possible
- Use consistent naming conventions
- Announce version deprecations early

API documentation should evolve alongside your application.

---

## What You Learned

By completing Day 28, you can now:
- Understand why API documentation is important
- Explain the OpenAPI specification
- Use Swagger to generate API documentation
- Implement API versioning
- Design APIs that remain stable as they evolve

These practices help make your APIs easier to use, maintain, and scale.

---

## Further Reading

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Documentation](https://swagger.io/docs/)
- [Redoc Documentation](https://redocly.com/)
- [Stripe API Docs](https://stripe.com/docs/api)
- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [REST API Design Best Practices](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)