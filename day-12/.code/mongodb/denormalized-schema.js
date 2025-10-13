const mongoose = require('mongoose');

// Denormalized Post schema embedding author info
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: {
    username: String,
    email: String
  },  // embedded document
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
