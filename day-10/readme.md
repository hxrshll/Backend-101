# Day 10: NoSQL Databases (MongoDB) - Part 1

Welcome to Day 10 of the Backend 101 30-day challenge.
Today you’ll explore NoSQL databases by learning the structure and usage of MongoDB, a popular document-based database. You will understand how NoSQL differs from SQL, when to use it, and how to work with documents, collections, and models.

By the end of this lesson, you’ll know how to model and interact with MongoDB using Mongoose, and build a basic blog system using collections like users and posts.

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is NoSQL](#what-is-nosql)
3. [MongoDB Concepts](#mongodb-concepts)
4. [Document Modeling: Embed vs Reference](#document-modeling-embed-vs-reference)
5. [Setting Up MongoDB and Mongoose](#setting-up-mongodb-and-mongoose)
6. [Schema and Model Definition](#schema-and-model-definition)
7. [Performing CRUD Operations](#performing-crud-operations)
8. [Practice Tasks](#practice-tasks)
9. [Bonus Challenges](#bonus-challenges)
10. [What You Learned](#what-you-learned)
11. [Further Reading](#further-reading)

---

## Introduction

Relational databases organize data in rows and columns. In contrast, NoSQL databases are schema-less or flexible in design and often handle hierarchical or unstructured data more naturally.

MongoDB is a widely-used NoSQL database where data is stored in JSON-like documents. It is highly scalable and works well for modern web applications.

---

## What is NoSQL

NoSQL stands for “Not Only SQL.” It is not a single technology, but a category of databases designed to handle:

- Large volumes of rapidly changing data
- Semi-structured or unstructured content
- Flexible schema designs

### When to Use NoSQL

- You need to store hierarchical or nested data
- Schema can evolve over time
- Performance and scalability are priorities
- You want to iterate quickly without rigid database migrations

---

## MongoDB Concepts

### Key Terms

| Term        | Description                                      |
|-------------|--------------------------------------------------|
| Database    | A container for collections                      |
| Collection  | A group of MongoDB documents (equivalent to SQL tables) |
| Document    | A single data record in BSON/JSON format         |
| Field       | A key-value pair inside a document               |

**Example Document**
```json
{
  "_id": "650f2...",
  "username": "hushhh",
  "email": "hushhh@example.com",
  "posts": [ "post1_id", "post2_id" ]
}
```

---

## Document Modeling: Embed vs Reference

### Embedded Documents

Store nested data inside a single document.

```json
{
  "title": "First Post",
  "content": "This is my post",
  "author": {
    "username": "hushhh",
    "email": "h@example.com"
  }
}
```

**Pros:**
- Fewer queries
- Better performance for reads

**Cons:**
- Data duplication
- Difficult to update repeated info

### Referenced Documents

Store related data in separate collections and link via IDs.

```json
// In posts collection
{
  "title": "First Post",
  "content": "This is my post",
  "authorId": "ObjectId('650f...')"
}
```

**Pros:**
- Avoids duplication
- Better normalization

**Cons:**
- Requires additional queries or .populate()

---

## Setting Up MongoDB and Mongoose

### Install MongoDB (Locally)

Download from [MongoDB Community Download](https://www.mongodb.com/try/download/community)

Use MongoDB Compass (GUI) or `mongod` CLI to run

### Create a Project and Install Mongoose
```sh
mkdir day-10-nosql
cd day-10-nosql
npm init -y
npm install mongoose
```

### Connect to MongoDB with Mongoose
```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
```

---

## Schema and Model Definition

### User Schema
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);
```

### Post Schema (with reference to User)
```js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);
```

---

## Performing CRUD Operations

### Create User
```js
const user = new User({ username: 'hushhh', email: 'hush@example.com' });
await user.save();
```

### Create Post
```js
const post = new Post({
  title: 'First Post',
  content: 'Welcome to NoSQL',
  author: user._id
});
await post.save();
```

### Read Posts with Author Populated
```js
const posts = await Post.find().populate('author');
console.log(posts);
```

### Update Post
```js
await Post.findByIdAndUpdate(post._id, { content: 'Updated content' });
```

### Delete User
```js
await User.findByIdAndDelete(user._id);
```

---

## Practice Tasks

Try writing code for the following:

- Fetch all posts written by a specific user
- Find all users who have not written any posts
- Add a createdAt field to posts and sort by newest
- Create a comment model and relate it to posts

---

## Bonus Challenges

- Implement data validation in the schemas (e.g., required, minLength)
- Add timestamps to models (`timestamps: true` in schema options)
- Build nested comment threads using embedded documents
- Seed the database with fake data using Faker.js
- Test queries using MongoDB Compass

---

## What You Learned

By completing Day 10, you should now be able to:

- Explain the difference between NoSQL and relational databases
- Understand when to use MongoDB and its benefits
- Model and create collections and documents
- Use Mongoose to perform CRUD operations
- Choose between embedded and referenced data designs

---

## Further Reading

- [MongoDB Official Docs](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB vs SQL Explained](https://www.mongodb.com/nosql-explained)
- [Mongoose Populate Tutorial](https://mongoosejs.com/docs/populate.html)