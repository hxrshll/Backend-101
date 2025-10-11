
const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const Post = require('../models/Post');

(async () => {
  await connectDB();
  const posts = await Post.find().populate('author');
  console.log('Posts:', posts);
  mongoose.connection.close();
})();