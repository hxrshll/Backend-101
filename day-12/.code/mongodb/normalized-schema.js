const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});

// Post schema referencing User (normalized)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // reference
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };
