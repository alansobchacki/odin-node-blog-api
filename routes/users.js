const express = require("express");
const router = express.Router();
const db = require("../db/queries");

// GET all users
router.get("/", async function (req, res) {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
