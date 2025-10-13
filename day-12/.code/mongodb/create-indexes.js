const mongoose = require('mongoose');
const { Post } = require('./normalized-schema');

// Create an index on authorId to speed up queries filtering by author
Post.collection.createIndex({ authorId: 1 });

// Compound index example on title and createdAt
Post.collection.createIndex({ title: 1, createdAt: -1 });
