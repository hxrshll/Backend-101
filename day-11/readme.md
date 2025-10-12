# Day 11: NoSQL Databases (MongoDB) - Part 2

Welcome to Day 11 of the Backend 101 30-day challenge. Yesterday, you learned how to model and query data in MongoDB. Today, we dive into more advanced features that allow you to query data efficiently and at scale.

By the end of this session, you will understand indexing, the aggregation pipeline, performance tuning, and real-world data analysis using MongoDB.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding Indexes](#understanding-indexes)
3. [Compound Indexes Explained](#compound-indexes-explained)
4. [Aggregation Pipeline](#aggregation-pipeline)
5. [Real-World Examples](#real-world-examples)
6. [Performance Tips](#performance-tips)
7. [Practice Tasks](#practice-tasks)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Further Reading](#further-reading)

---

## Introduction

MongoDB provides advanced tools to help you optimize read performance and analyze large amounts of data efficiently.

Today, you'll focus on:

- **Indexing:** how to speed up queries
- **Aggregation:** how to group, filter, and transform data
- **Performance:** how to monitor and tune query behavior

---

## Understanding Indexes

### What is an Index?

An index is a data structure that improves the speed of queries. Without indexes, MongoDB must scan the entire collection to find matching documents (called a collection scan).

### Creating a Basic Index
```js
// Create an index on the "username" field
 db.users.createIndex({ username: 1 });
```

Use `1` for ascending and `-1` for descending order.

### When to Use Indexes

- Fields frequently used in filters, sorting, or joins
- Fields used in pagination or range queries
- Avoid unnecessary indexes on collections with heavy write loads

---

## Compound Indexes Explained

### What is a Compound Index?

Compound indexes allow you to index multiple fields in one index.

```js
// Compound index on title and author
 db.posts.createIndex({ title: 1, author: 1 });
```

### Why Field Order Matters

The order of fields in a compound index affects which queries can use it. For example:

```js
db.posts.find({ title: "MongoDB" }) // Uses the index
db.posts.find({ author: "user123" }) // Cannot use the index unless title is also in the filter
```

---

## Aggregation Pipeline

Aggregation is like a factory conveyor belt. Each stage takes input, transforms it, and passes it to the next stage.

Input → $match → $group → $project → Output

This makes it ideal for analyzing and transforming structured data across documents.

### Common Aggregation Stages

| Stage    | Description                          |
|----------|--------------------------------------|
| $match   | Filters documents (like WHERE)        |
| $group   | Groups data and performs calculations |
| $sort    | Sorts documents                      |
| $project | Shapes output (includes/excludes fields) |
| $lookup  | Performs joins between collections    |
| $unwind  | Flattens array fields into documents  |

#### What is $unwind?

`$unwind` breaks apart an array field into multiple documents. After `$lookup`, it is commonly used to flatten the joined results for easier access.

---

## Real-World Examples

### 1. Count Comments Per Post
```js
db.comments.aggregate([
  {
    $group: {
      _id: "$postId",
      totalComments: { $sum: 1 }
    }
  }
]);
```
**Expected Output:**
```json
[
  { "_id": ObjectId("..."), "totalComments": 5 },
  { "_id": ObjectId("..."), "totalComments": 2 }
]
```

### 2. Join Posts with Author Info
```js
db.posts.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "authorInfo"
    }
  },
  { $unwind: "$authorInfo" },
  {
    $project: {
      title: 1,
      content: 1,
      "authorInfo.username": 1
    }
  }
]);
```
**Explanation:** `$lookup` joins posts with the users collection. `$unwind` flattens the result so authorInfo is no longer an array.

### 3. Top 3 Most Commented Posts
```js
db.comments.aggregate([
  {
    $group: {
      _id: "$postId",
      totalComments: { $sum: 1 }
    }
  },
  { $sort: { totalComments: -1 } },
  { $limit: 3 }
]);
```
Returns the three posts with the highest number of comments.

---

## Performance Tips

### Use .explain() to Analyze Queries
```js
db.posts.find({ author: "abc" }).explain("executionStats");
```
Look at the `executionStats.stage` field:
- `COLLSCAN` means a full collection scan
- `IXSCAN` means an index is being used

Aim for `IXSCAN` wherever possible.

### Additional Tips

- Use projections to limit returned fields
- Avoid `$lookup` in frequently-used API routes
- Monitor performance using MongoDB Compass

---

## Practice Tasks

Try writing aggregation queries for the following:

- Count how many posts each user has written
- Get the average number of comments per post
- Find users who have never written a post
- Retrieve the five latest comments with author information

---

## Bonus Challenges

- Create a compound index on posts with title and createdAt
- Use `$facet` to run multiple aggregations in a single query
- Build a nested aggregation that gets posts, their comments, and user info
- Add a createdAt field to comments and find the most active comment day

---

## What You Learned

By completing Day 11, you should now be able to:

- Create single-field and compound indexes
- Use aggregation pipelines to analyze MongoDB data
- Write and optimize queries using `$group`, `$lookup`, `$project`, and `$sort`
- Evaluate query performance with `.explain()`

---

## Further Reading

- [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Indexing in MongoDB](https://www.mongodb.com/docs/manual/indexes/)
- [Compass Aggregation Builder](https://www.mongodb.com/products/compass)
- [Mongoose Aggregate Docs](https://mongoosejs.com/docs/api/aggregate.html)