const client = require('./redis-client');
const Post = require('./models/Post'); // Assuming Mongoose Post model

async function getPopularPosts() {
  const cacheKey = 'popular_posts';

  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log('Serving from cache');
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.error('Error fetching from Redis:', err);
  }

  // If not cached, fetch from DB
  const posts = await Post.find().sort({ likes: -1 }).limit(5);

  try {
    await client.setEx(cacheKey, 60, JSON.stringify(posts));
    console.log('Cached data set');
  } catch (err) {
    console.error('Error setting cache:', err);
  }

  return posts;
}

module.exports = { getPopularPosts };
