# Day 8: Relational Databases (SQL) - Part 1

Welcome to Day 8 of the Backend 101 30-day challenge.
Today begins Week 2, focusing on databases and backend architecture.

By the end of this day, you will have a solid understanding of relational databases and SQL, including schema design, relationships, and querying data.

---

## Table of Contents

1. [Recap: Key Concepts](#recap-key-concepts)
2. [Project Overview](#project-overview)
3. [Data Models](#data-models)
4. [Writing SQL: Creating and Querying Tables](#writing-sql-creating-and-querying-tables)
5. [Data Relationship Walkthroughs](#data-relationship-walkthroughs)
6. [Goal](#goal)
7. [Bonus Challenges](#bonus-challenges)
8. [What You Learned](#what-you-learned)
9. [Additional Resources](#additional-resources)

---

## Recap: Key Concepts

Relational databases store data in tables, where each table represents a specific entity (e.g., users, posts). Each row in a table represents a single record. Columns define the properties of each record.

### Key Concepts:

- **Primary Key:** A column (or set of columns) that uniquely identifies each row in a table.
- **Foreign Key:** A column that references the primary key in another table to define a relationship.
- **One-to-One (1:1):** Each row in Table A relates to one row in Table B.
- **One-to-Many (1:N):** A row in Table A relates to multiple rows in Table B.
- **Many-to-Many (M:N):** Rows in Table A relate to multiple rows in Table B and vice versa. This requires a join table.
- **Normalization:** The process of structuring data to minimize redundancy and improve integrity. Typically follows rules known as normal forms (1NF, 2NF, 3NF, etc.).

---

## Project Overview

You will design and implement a relational database schema for a simple blog application. This includes:

- Creating tables for users, posts, and comments
- Defining relationships between these tables
- Writing SQL queries to insert and retrieve data

---

## Data Models

Here are the entities and fields your database will manage:

### User

- `id` (Primary Key)
- `username` (string, unique, not null)
- `email` (string, unique, not null)

### Post

- `id` (Primary Key)
- `user_id` (Foreign Key referencing `users.id`)
- `title` (string, not null)
- `content` (text)
- `created_at` (timestamp, default to current time)

### Comment

- `id` (Primary Key)
- `post_id` (Foreign Key referencing `posts.id`)
- `user_id` (Foreign Key referencing `users.id`)
- `content` (text, not null)
- `created_at` (timestamp, default to current time)

---

## Writing SQL: Creating and Querying Tables

### Step 1: Creating Tables

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Inserting Sample Data

```sql
INSERT INTO users (username, email) VALUES
  ('harshal', 'harshal@example.com'),
  ('hushhh', 'hushhh@example.com');

INSERT INTO posts (user_id, title, content) VALUES
  (1, 'Understanding SQL Basics', 'This post explains SQL fundamentals.');

INSERT INTO comments (post_id, user_id, content) VALUES
  (1, 2, 'This is really helpful.'),
  (1, 1, 'Thank you!');
```

### Step 3: Running Queries

Get all posts with author names:

```sql
SELECT posts.title, users.username
FROM posts
JOIN users ON posts.user_id = users.id;
```

Get all comments with commenter name and post title:

```sql
SELECT comments.content, users.username AS commenter, posts.title AS post
FROM comments
JOIN users ON comments.user_id = users.id
JOIN posts ON comments.post_id = posts.id;
```

---

## Data Relationship Walkthroughs

### One-to-Many (1:N): Users → Posts

- A user can write multiple posts
- `posts.user_id` is a foreign key pointing to `users.id`

### One-to-Many (1:N): Posts → Comments

- A post can have many comments
- `comments.post_id` is a foreign key pointing to `posts.id`

### One-to-Many (1:N): Users → Comments

- A user can leave multiple comments
- `comments.user_id` points to `users.id`

---

## Goal

By the end of Day 8, you should be able to:

- Design a relational schema using SQL
- Create tables with relationships
- Insert and query data using SQL
- Understand how to model data relationships

---

## Bonus Challenges

- Add a `tags` table and implement a many-to-many relationship between posts and tags using a join table.
- Add a `likes` table to allow users to like posts.
- Implement cascading deletes so that when a user or post is deleted, related data is cleaned up.

---

## What You Learned

- How to design and normalize a relational database schema
- How to create tables and define relationships using SQL
- How to write queries to insert and retrieve data
- How to model real-world data relationships

---

## Additional Resources

- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [SQLBolt - Interactive Lessons](https://sqlbolt.com/)
- [What is Database Normalization?](https://www.essentialsql.com/what-is-database-normalization/)
- [Learn SQL in 3 Hour (YouTube)](https://www.youtube.com/watch?v=7S_tz1z_5bA)