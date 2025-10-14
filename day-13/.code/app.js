const express = require('express');
const mongoose = require('mongoose');
const { getPopularPosts } = require('./cache');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (adjust URI as needed)
mongoose.connect('mongodb://localhost:27017/caching-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/popular-posts', async (req, res) => {
  try {
    const posts = await getPopularPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
