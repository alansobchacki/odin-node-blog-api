const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

// create new user
router.post("/", async function (req, res) {
  const { email, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(email, name, hashedPassword);

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      const field = error.meta.target[0];
      res.status(400).json({ message: `${field} already taken` });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

// get all users
router.get("/", async function (req, res) {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
