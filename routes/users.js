const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

// POST / CREATE new user
router.post("/", async function (req, res) {
  const { email, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(email, name, hashedPassword);

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
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
