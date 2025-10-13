-- Index on user_id in posts table for faster author queries
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index example on title and created_at
CREATE INDEX idx_posts_title_created_at ON posts(title, created_at DESC);
