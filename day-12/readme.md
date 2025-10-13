# Day 12: Database Design Principles

Welcome to Day 12 of the Backend 101 30-day challenge. So far, you’ve worked hands-on with both relational (SQL) and non-relational (NoSQL) databases. Today is about thinking like a backend architect—designing systems that are reliable, efficient, and scalable.

By the end of this session, you will understand how to apply core database design principles, when to normalize or denormalize, and how to optimize data access using indexes.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What Makes a Database Well-Designed](#what-makes-a-database-well-designed)
3. [ACID Principles](#acid-principles)
4. [Normalization vs Denormalization](#normalization-vs-denormalization)
5. [Indexing Revisited](#indexing-revisited)
6. [Refactoring for Performance](#refactoring-for-performance)
7. [Practice Tasks](#practice-tasks)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Key Takeaway](#key-takeaway)
11. [Further Reading](#further-reading)

---

## Introduction

Good backend developers write queries. Great backend developers design systems that scale.

Today’s focus is not just writing code but structuring your database in a way that supports both performance and data integrity. This includes:

- Designing for reliability and consistency
- Structuring data to avoid redundancy
- Using indexes to improve performance
- Making conscious tradeoffs between read and write efficiency

---

## What Makes a Database Well-Designed

A well-designed database:

- Maintains integrity. Data is valid, consistent, and accurate
- Scales well. Supports growth in size and users
- Performs efficiently. Queries return fast results without overloading resources
- Is adaptable. Accommodates changes in business logic and requirements

Database design is about tradeoffs. The goal is to make those tradeoffs thoughtfully.

---

## ACID Principles

ACID stands for:

| Principle   | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| Atomicity   | Operations are all-or-nothing. If one part fails, the entire operation fails.|
| Consistency | Guarantees that the database remains valid before and after a transaction.   |
| Isolation   | Transactions do not interfere with each other. Each runs independently.      |
| Durability  | Once committed, changes remain. This holds true even during a crash or restart.|

ACID is a foundational concept in relational databases like PostgreSQL and MySQL.

### How ACID Applies to NoSQL

Some NoSQL databases support partial ACID compliance. For example:

- MongoDB supports multi-document transactions (since v4.0), which makes atomic updates possible across collections.

However, MongoDB prioritizes availability and scalability by default. This may relax consistency guarantees in distributed setups.

This tradeoff reflects a core idea in distributed systems, often discussed in the context of the CAP theorem.

---

## Normalization vs Denormalization

Designing your data model involves choosing between two approaches.

### Normalization

Organizes data to reduce redundancy. Ensures consistency and smaller storage size.

**Normalized Example:**
```json
// Users Collection:
{ "_id": ObjectId("..."), "name": "Alice" }

// Posts Collection:
{ "_id": ObjectId("..."), "title": "First Post", "userId": ObjectId("...") }
```

### Denormalization

Duplicates data to improve read performance. Often used in analytics or NoSQL systems.

**Denormalized Example:**
```json
// Posts Collection:
{ "_id": ObjectId("..."), "title": "First Post", "authorName": "Alice" }
```

### Comparison Summary

| Feature         | Normalized                              | Denormalized                        |
|-----------------|-----------------------------------------|-------------------------------------|
| Read speed      | Slower (requires joins or lookups)      | Faster (all in one document)        |
| Write speed     | Faster                                  | Slower (requires more updates)      |
| Data consistency| Strong                                  | Weaker (risk of stale/duplicate data) |
| Storage         | Efficient                               | May increase                        |

---

## Indexing Revisited

### What Are Indexes?

Indexes are data structures that improve the speed of read operations by allowing quick lookups on specific fields.

Without an index, the database performs a full scan of the collection or table.

### Creating an Index

**MongoDB:**
```js
// Index on 'createdAt' field
db.posts.createIndex({ createdAt: -1 });
```

**PostgreSQL:**
```sql
CREATE INDEX idx_created_at ON posts(created_at DESC);
```

### Use Indexes When:

- Querying with find, where, or sort on specific fields
- Using foreign keys in joins
- Filtering on frequently-used fields in large datasets

### Be Cautious:

- Avoid over-indexing. Each index adds overhead on insert and update.
- Do not index fields with low selectivity (for example, isActive: true/false)

---

## Refactoring for Performance

Here is an example of how a common query can be optimized using indexing.

**Original (No Index):**
```js
// Retrieve all posts by a user
db.posts.find({ authorId: "user123" });
```
MongoDB performs a full scan if authorId is not indexed.

**Optimized with Index:**
```js
db.posts.createIndex({ authorId: 1 });
db.posts.find({ authorId: "user123" });
```

You can verify performance using `.explain()`:
```js
db.posts.find({ authorId: "user123" }).explain("executionStats");
```

Look for:
- `"stage": "IXSCAN"` to confirm the index was used
- `"stage": "COLLSCAN"` to detect a full scan

---

## Practice Tasks

- Refactor your MongoDB schema to add indexes where appropriate (for example, createdAt, authorId)
- Run `.explain("executionStats")` on a query before and after adding an index
- Identify which models or tables in your project are normalized. Consider where denormalization might help
- Compare embedded versus referenced data in one schema and evaluate performance tradeoffs

---

## Bonus Challenges

- Create a compound index for a search feature (such as title and createdAt)
- Normalize a JSON dataset into SQL tables and write the CREATE TABLE statements
- Use MongoDB’s `populate()` and compare with a denormalized version of the same query
- Implement a transaction in Mongoose using sessions

---

## What You Learned

By completing Day 12, you should now be able to:

- Explain the ACID properties and their impact on consistency
- Decide when to normalize or denormalize data based on real-world needs
- Use indexing to significantly improve query performance
- Evaluate and refactor your database for better structure and efficiency

---

## Key Takeaway

A great backend engineer does more than write functional code. They design data with purpose. The structure of your database directly impacts API performance, data consistency, and your application’s ability to scale.

Database design is not just about storage. It is about strategy.

---

## Further Reading

- [Understanding ACID Transactions (IBM)](https://www.ibm.com/topics/acid-transactions)
- [MongoDB Indexing Documentation](https://www.mongodb.com/docs/manual/indexes/)
- [PostgreSQL Indexing Guide](https://www.postgresql.org/docs/current/indexes.html)
- [MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)
- [Normalization vs Denormalization](https://www.mongodb.com/basics/normalization-vs-denormalization)