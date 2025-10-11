const connectDB = require('./db/connect');
const User = require('./models/User');
const Post = require('./models/Post');

(async () => {
  await connectDB();
  // Example: create a user and a post
  const user = new User({ username: 'hushhh', email: 'hush@example.com' });
  await user.save();
  const post = new Post({
    title: 'First Post',
    content: 'Welcome to NoSQL',
    author: user._id
  });
  await post.save();
  console.log('User and Post created');
  mongoose.connection.close();
})();