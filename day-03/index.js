const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store (simulating a database)
let posts = [
  { id: 1, title: 'First Post', content: 'This is my first post!' },
  { id: 2, title: 'Second Post', content: 'This is my second post!' }
];

// GET: Fetch all posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// GET: Fetch a post by ID
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json(post);
});

// POST: Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT: Update a post by ID
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.title = title || post.title;
  post.content = content || post.content;

  res.status(200).json(post);
});

// DELETE: Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.status(204).send();
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
