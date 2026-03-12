const express = require("express");
const router = express.Router();

const cache = require("../utils/cache");

const users = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: "User " + (i + 1)
}));

router.get("/", (req, res) => {

  console.time("optimized-endpoint");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const cacheKey = `users-${page}-${limit}`;

  const cached = cache.get(cacheKey);

  if (cached) {
    console.timeEnd("optimized-endpoint");
    return res.json(cached);
  }

  const start = (page - 1) * limit;
  const end = page * limit;

  const result = users.slice(start, end);

  cache.set(cacheKey, result);

  console.timeEnd("optimized-endpoint");

  res.json(result);

});

module.exports = router;