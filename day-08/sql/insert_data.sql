-- Insert sample users
INSERT INTO Users (username, email) VALUES ('abc', 'abc@example.com');
INSERT INTO Users (username, email) VALUES ('xyz', 'xyz@example.com');

-- Insert sample posts
INSERT INTO Posts (user_id, title, content) VALUES (1, 'First Post', 'This is the content of the first post.');
INSERT INTO Posts (user_id, title, content) VALUES (2, 'Second Post', 'Content for the second post.');

-- Insert sample comments
INSERT INTO Comments (post_id, user_id, comment) VALUES (1, 2, 'Great post, abc!');
INSERT INTO Comments (post_id, user_id, comment) VALUES (2, 1, 'Thanks xyz, nice post!');
