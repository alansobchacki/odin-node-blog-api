const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const isAdmin = require("../middleware/isAdmin");

// get posts page
router.get("/", async function (req, res) {
  try {
    const posts = await db.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

// create new post
router.post("/", async function (req, res) {
  try {
    const { userId, title, content, published } = req.body;
    const post = await db.createPost(userId, title, content, published);

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

// publish/unpublish a post
router.post("/", isAdmin, async function (req, res) {
  try {
    const { post_id, published } = req.body;
    const updatedPost = await db.editPostAvailability(post_id, published);

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Unable to edit post status: ${error}` });
  }
});

module.exports = router;
