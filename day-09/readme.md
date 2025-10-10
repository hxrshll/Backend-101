# Day 9: Relational Databases (SQL) - Part 2

Welcome to Day 9 of the Backend 101 30-day challenge.
Today, you will deepen your understanding of relational databases by exploring advanced SQL concepts like JOINs, GROUP BY, and ORDER BY.

By the end of this day, you will be able to write complex queries to analyze and manipulate data across multiple tables.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding Relationships and JOINs](#understanding-relationships-and-joins)
3. [Aggregating Data with GROUP BY](#aggregating-data-with-group-by)
4. [Sorting Results with ORDER BY](#sorting-results-with-order-by)
5. [Real-World Example: Blog System](#real-world-example-blog-system)
6. [Deep-Dive Queries Explained](#deep-dive-queries-explained)
7. [Practice](#practice-prompts)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Further Reading](#further-reading)

---

## Introduction

In relational databases, the real power comes from connecting data across tables. Today you’ll explore the SQL constructs that allow you to:

- Link tables (**JOIN**)
- Analyze patterns (**GROUP BY**)
- Sort and rank information (**ORDER BY**)

These are essential tools for answering complex questions about your data, forming the backbone of backend reporting logic.

---

## Understanding Relationships and JOINs

### What is a JOIN?

A **JOIN** lets you combine rows from two or more tables based on a related column. It’s how you reassemble data that’s been normalized into separate tables.

### Types of JOINs

| JOIN Type   | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| **INNER JOIN** | Only returns rows where there’s a match in both tables                     |
| **LEFT JOIN**  | Returns all rows from the left table, plus matches from the right table   |
| **RIGHT JOIN** | Returns all rows from the right table, plus matches from the left table   |
| **FULL JOIN**  | Returns rows when there’s a match in either table                         |
| **CROSS JOIN** | Returns the Cartesian product of the two tables (every row from A with B) |

### Syntax

```sql
SELECT a.column, b.column
FROM TableA a
JOIN TableB b ON a.foreign_key = b.primary_key;
```

### Example

```sql
SELECT Posts.title, Users.username
FROM Posts
JOIN Users ON Posts.user_id = Users.id;
```

This retrieves all posts along with the name of the user who created each one.

---

## Aggregating Data with GROUP BY

### What is GROUP BY?

**GROUP BY** groups rows that have the same value in specified columns into summary rows. It's used with aggregate functions like `COUNT()`, `SUM()`, `AVG()`, etc.

### Common Aggregations

| Function   | Description              |
|------------|--------------------------|
| **COUNT()** | Counts rows              |
| **SUM()**   | Adds values              |
| **AVG()**   | Calculates average       |
| **MAX()**   | Returns highest value    |
| **MIN()**   | Returns lowest value     |

### Example

```sql
SELECT post_id, COUNT(*) AS comment_count
FROM Comments
GROUP BY post_id;
```

This counts how many comments each post has.

---

## Sorting Results with ORDER BY

### Syntax

```sql
SELECT column1, column2
FROM table
ORDER BY column1 ASC, column2 DESC;
```

Use `ASC` for ascending (default) and `DESC` for descending.

### Example

```sql
SELECT username, COUNT(Posts.id) AS post_count
FROM Users
LEFT JOIN Posts ON Users.id = Posts.user_id
GROUP BY Users.username
ORDER BY post_count DESC;
```

This lists users by how many posts they’ve made, starting from the most active.

---

## Real-World Example: Blog System

### Schema

```sql
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)
);

CREATE TABLE Posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id),
  title TEXT
);

CREATE TABLE Comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES Posts(id),
  user_id INTEGER REFERENCES Users(id),
  comment TEXT
);
```

This schema reflects a simplified blogging platform.

---

## Deep-Dive Queries Explained

### 1. Get all posts and their authors

```sql
SELECT Posts.title, Users.username
FROM Posts
JOIN Users ON Posts.user_id = Users.id;
```

**Why it works:** Posts and Users are joined on the foreign key `user_id`. You can now show who wrote each post.

### 2. Get all comments on a specific post

```sql
SELECT Comments.comment, Users.username
FROM Comments
JOIN Users ON Comments.user_id = Users.id
WHERE Comments.post_id = 1;
```

**Use case:** Display a comment thread, including the name of each commenter.

### 3. Count the number of comments per post

```sql
SELECT Posts.title, COUNT(Comments.id) AS comment_count
FROM Posts
LEFT JOIN Comments ON Posts.id = Comments.post_id
GROUP BY Posts.title;
```

**Note:** Use `LEFT JOIN` to include posts that have zero comments.

### 4. Find users who haven’t written any posts

```sql
SELECT Users.username
FROM Users
LEFT JOIN Posts ON Users.id = Posts.user_id
WHERE Posts.id IS NULL;
```

**Explanation:** `LEFT JOIN` gives all users. The `WHERE` filters only those without a match in the Posts table.

### 5. Get the top 3 most commented posts

```sql
SELECT Posts.title, COUNT(Comments.id) AS total_comments
FROM Posts
LEFT JOIN Comments ON Posts.id = Comments.post_id
GROUP BY Posts.title
ORDER BY total_comments DESC
LIMIT 3;
```

---

## Practice 

Try to write these yourself:

1. List all users and the number of comments they've written.
2. Show posts that have more than 5 comments.
3. Get the average number of comments per post.
4. Find which user has posted the most.

---

## Bonus Challenges

- Use `HAVING` to filter groups (e.g., only users with more than 2 posts).
- Create a query to list each post with its author and total number of comments.
- List all users who commented on their own posts.
- Implement `RANK()` or `ROW_NUMBER()` if your DB supports window functions.

---

## What You Learned

By completing Day 9, you should be comfortable with:

- Using `JOIN` to combine data across related tables
- Writing aggregate queries using `GROUP BY`
- Ordering results with `ORDER BY` for ranking or sorting
- Applying these techniques to solve real-world data questions

This sets you up for backend tasks like analytics, reporting, and efficient API data querying.

---

## Further Reading

- [SQL JOIN Visualizer (Learn JOINs Interactively)](https://sql-visualizer.com/)
- [PostgreSQL GROUP BY Tutorial](https://www.postgresql.org/docs/)
- [SQLBolt: Learn SQL with interactive lessons](https://sqlbolt.com/)