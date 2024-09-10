const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const authenticateToken = require("../middleware/authenticateToken");

// create new post
router.post("/", authenticateToken, async function (req, res) {
  try {
    const { title, content, published } = req.body;
    const post = await db.createPost(title, content, published);

    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
