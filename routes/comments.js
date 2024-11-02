const express = require("express");
const router = express.Router();
const db = require("../db/queries");

// create a new comment for a specific post
router.post("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { author_id, author_name, content } = req.body;

    const comment = await db.createComment(postId, author_id, author_name, content);

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ message: `Unable to create comment: ${error.message}` });
  }
});

// get all comments for a specific post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await db.getAllComments(postId);

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ message: `Unable to fetch comments: ${error.message}` });
  }
});

// delete a specific comment
router.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await db.deleteComment(commentId);

    return res.status(200).json({ message: "Comment deleted", deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ message: `Unable to delete comment: ${error.message}` });
  }
});

module.exports = router;
