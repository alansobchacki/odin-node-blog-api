const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  res.send("Welcome to the Blog API");
});

module.exports = router;
