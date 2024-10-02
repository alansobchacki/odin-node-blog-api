const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const isAdmin = require("../middleware/isAdmin");

// get posts page
router.get("/", isAdmin, async function (req, res) {
  try {
    const posts = await db.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

// create new post
router.post("/", isAdmin, async function (req, res) {
  try {
    const { title, content, published } = req.body;
    const post = await db.createPost(req.user, title, content, published);

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

module.exports = router;
