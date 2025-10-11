const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const User = require('../models/User');
const Post = require('../models/Post');

(async () => {
  await connectDB();
  const user = await User.findOne();
  const post = new Post({
    title: 'First Post',
    content: 'Welcome to NoSQL',
    author: user._id
  });
  await post.save();
  console.log('Post created:', post);
  mongoose.connection.close();
})();