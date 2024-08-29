const express = require("express");
const router = express.Router();
const db = require("../db/queries");

// POST / CREATE new user
router.post("/", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

// GET / READ all users
router.get("/", async function (req, res) {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

// PUT / UPDATE a user
router.put("/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user /${req.params.userId} resource`);
});

// DELETE a user
router.delete("/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user /${req.params.userId} resource`);
});

module.exports = router;
