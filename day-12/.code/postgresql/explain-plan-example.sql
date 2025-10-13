EXPLAIN ANALYZE
SELECT * FROM posts WHERE user_id = 1 ORDER BY created_at DESC;

-- Look for "Index Scan" to confirm index usage
-- If it says "Seq Scan" then the index was not used
