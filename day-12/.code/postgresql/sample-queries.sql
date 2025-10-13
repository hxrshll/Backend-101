-- Query posts by a specific user ordered by date
SELECT * FROM posts WHERE user_id = 1 ORDER BY created_at DESC;

-- Query posts where title contains 'backend'
SELECT * FROM posts WHERE title ILIKE '%backend%' ORDER BY created_at DESC;
