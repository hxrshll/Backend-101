const { Post } = require('./normalized-schema');

// Find all posts by a specific author
async function findPostsByAuthor(authorId) {
  return await Post.find({ authorId }).sort({ createdAt: -1 });
}

// Find posts with title containing keyword, sorted by date
async function findPostsByTitleKeyword(keyword) {
  return await Post.find({ title: new RegExp(keyword, 'i') }).sort({ createdAt: -1 });
}
