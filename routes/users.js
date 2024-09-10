const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const authenticateToken = require("../middleware/authenticateToken");

// create new user
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

// get all users
router.get("/", authenticateToken, async function (req, res) {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
