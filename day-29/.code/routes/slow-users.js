const express = require("express");
const router = express.Router();

const users = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: "User " + (i + 1)
}));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

router.get("/", async (req, res) => {

  console.time("slow-endpoint");

  await sleep(1000); // simulate slow DB query

  res.json(users);

  console.timeEnd("slow-endpoint");

});

module.exports = router;