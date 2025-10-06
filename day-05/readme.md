
# Day 5: Introduction to Databases

Welcome to Day 5 of the Backend 101 – 30-Day Challenge!
Today, you’ll explore how data is stored, retrieved, and organized in modern backend applications. This session introduces both SQL (relational) and NoSQL (non-relational) databases and walks you through building a simple API with database integration.

---

## Table of Contents
1. [What Are Databases?](#what-are-databases)
2. [SQL vs NoSQL](#sql-vs-nosql)
3. [How Backends Use Databases](#how-backends-use-databases)
4. [SQL Basics](#sql-basics)
5. [NoSQL Basics (MongoDB)](#nosql-basics-mongodb)
6. [Visual Flow](#visual-flow)
7. [Hands-On](#hands-on)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Additional Resources](#additional-resources)

---

## What Are Databases?

A database is a structured collection of data. It allows backend applications to store, retrieve, update, and delete persistent information.

**Backends use databases to:**
- Store user information
- Track transactions
- Manage content (posts, messages, etc.)
- Support filters, searches, and queries

---

## SQL vs NoSQL

| Feature      | SQL (Relational)           | NoSQL (Non-relational)         |
|--------------|---------------------------|-------------------------------|
| Structure    | Tables (rows & columns)   | Collections & documents        |
| Schema       | Fixed, defined ahead      | Dynamic/flexible               |
| Joins        | Supported                 | Not typical (use embedded docs)|
| Examples     | PostgreSQL, MySQL, SQLite | MongoDB, Firebase, CouchDB     |
| Use Cases    | Structured data, complex relationships | Fast iteration, flexible schema |

---

## How Backends Use Databases

The typical flow for database interaction:
1. Client sends a request (e.g., POST /users)
2. Backend receives and parses the request
3. Validates the input data
4. Interacts with the database using SQL queries or NoSQL commands
5. Returns a structured response

---

## SQL Basics

**Key Concepts**
- **Table:** Like a spreadsheet with rows and columns
- **Row:** A record (user, post, etc.)
- **Column:** A field (name, email, etc.)

**Example: users Table**
| id | name  | email           |
|----|-------|-----------------|
| 1  | Alice | alice@email.com |
| 2  | Bob   | bob@email.com   |

**Common SQL Operations**
```sql
-- Create table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT
);

-- Insert
INSERT INTO users (name, email) VALUES ('Alice', 'alice@email.com');

-- Read
SELECT * FROM users;

-- Update
UPDATE users SET name = 'Alicia' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 2;
```

> ⚠️ **Note:** Always validate and sanitize input to avoid SQL injection.

---

## NoSQL Basics (MongoDB)

MongoDB stores data in documents (similar to JSON) inside collections.

**Example Document**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice",
  "email": "alice@email.com"
}
```

**Key Concepts**
- **Collection:** Like a SQL table
- **Document:** Like a row, but flexible
- **Schema-less:** Documents can differ in structure

**Common MongoDB Operations (with Mongoose)**
```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

// Create
await User.create({ name: 'Alice', email: 'alice@email.com' });

// Read
const users = await User.find();

// Update
await User.findByIdAndUpdate(id, { name: 'Alicia' });

// Delete
await User.findByIdAndDelete(id);
```

---

## Visual Flow

![Backend to Database Flow](./assets/be-db.png)

---

## Hands-On

### Option A: SQLite (Relational)

**Install SQLite**
```bash
# macOS
brew install sqlite
# Ubuntu
sudo apt install sqlite3
# Windows
# Download from https://sqlite.org
```

**Setup**
```bash
npm install sqlite3
```

**Create db.js**
```js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT
)`);

module.exports = db;
```

**In server.js**
```js
const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
});
```

> 💡 **Note:** sqlite3 uses callbacks. For async/await, consider better-sqlite3.

### Option B: MongoDB (NoSQL)

**Install & Setup**
```bash
npm install mongoose dotenv
```

**.env**
```env
MONGO_URI=mongodb://localhost:27017/backend101
```

**server.js**
```js
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
```

**models/User.js**
```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
```

**In routes**
```js
const User = require('./models/User');

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const user = await User.create({ name, email });
  res.status(201).json(user);
});
```

**Suggested Folder Structure**
```
backend101/
├── db.js              # SQLite setup
├── models/            # Mongoose models
├── routes/            # API route handlers
├── server.js          # Main entry
├── .env               # For environment variables
```

---

## Bonus Challenges

- Add a `GET /users` route to list all users.
- Add a `GET /users/:id` route to fetch user by ID.
- Add a `PUT /users/:id` route to update user info.
- Add a `DELETE /users/:id` route to delete a user.
- Add basic validation (name and email required).
- Try both SQL and MongoDB implementations.
- Use dotenv for DB connection strings.
- For SQLite, explore better-sqlite3 for promise support.

---

## What You Learned

By the end of Day 5, you now understand:
- What databases are and how they’re used in backends
- The differences between SQL and NoSQL systems
- How to perform CRUD operations in SQLite and MongoDB
- How Express integrates with a database
- How to validate input and handle database responses
- Visual flow of request → validation → DB → response

---

## Additional Resources

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [PostgreSQL vs MongoDB](https://www.educba.com/postgresql-vs-mongodb/)
- [REST API + DB Tutorial (YouTube)](https://www.youtube.com/watch?v=fgTGADljAeg)