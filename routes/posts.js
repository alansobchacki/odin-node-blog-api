const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const authenticateToken = require("../middleware/authenticateToken");
const isAdmin = require("../middleware/isAdmin");

// create new post
router.post("/", authenticateToken, isAdmin, async function (req, res) {
  try {
    const { title, content, published } = req.body;
    const post = await db.createPost(req.user, title, content, published);

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});
