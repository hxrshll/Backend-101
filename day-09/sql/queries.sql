-- 1. Posts with authors
SELECT Posts.title, Users.username
FROM Posts
JOIN Users ON Posts.user_id = Users.id;

-- 2. Comments on a specific post
SELECT Comments.comment, Users.username
FROM Comments
JOIN Users ON Comments.user_id = Users.id
WHERE Comments.post_id = 1;

-- 3. Comment count per post
SELECT Posts.title, COUNT(Comments.id) AS comment_count
FROM Posts
LEFT JOIN Comments ON Posts.id = Comments.post_id
GROUP BY Posts.title;

-- 4. Most commented posts
SELECT Posts.title, COUNT(Comments.id) AS total_comments
FROM Posts
LEFT JOIN Comments ON Posts.id = Comments.post_id
GROUP BY Posts.id
ORDER BY total_comments DESC;

-- 5. Users without posts
SELECT Users.username
FROM Users
LEFT JOIN Posts ON Users.id = Posts.user_id
WHERE Posts.id IS NULL;