const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const Post = require('../models/Post');

(async () => {
  await connectDB();
  const post = await Post.findOne();
  if (post) {
    post.content = 'Updated content';
    await post.save();
    console.log('Post updated:', post);
  } else {
    console.log('No post found to update.');
  }
  mongoose.connection.close();
})();