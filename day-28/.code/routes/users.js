const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get("/", (req, res) => {
  const users = [
    { id: 1, name: "harshal" },
    { id: 2, name: "hushhh" }
  ];

  res.json(users);
});

module.exports = router;