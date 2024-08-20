const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    const users = await db.getAllUsers();
    console.log(users);
  } catch (err) {
    console.log(err);
  }

  res.send("Welcome to the Blog API");
});

module.exports = router;
