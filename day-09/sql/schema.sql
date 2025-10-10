-- Users table
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);

-- Posts table
CREATE TABLE Posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id),
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments table
CREATE TABLE Comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES Posts(id),
  user_id INTEGER REFERENCES Users(id),
  comment TEXT
);

-- Sample data
INSERT INTO Users (username, email) VALUES
('alice', 'hushhh@example.com'),
('bob', 'harshal@example.com');

INSERT INTO Posts (user_id, title, content) VALUES
(1, 'First Post', 'This is hushhh''s first post'),
(2, 'Hello World', 'harshal''s intro post');

INSERT INTO Comments (post_id, user_id, comment) VALUES
(1, 2, 'Nice post!'),
(1, 1, 'Thanks!'),
(2, 1, 'Welcome harshal!');