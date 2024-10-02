const express = require("express");
const router = express.Router();
const db = require("../db/queries");

// get all posts
router.get("/", async function (req, res) {
  try {
    const posts = await db.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
