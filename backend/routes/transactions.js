const express = require("express");
const router = express.Router();
//const knex = require("../db.js");

router.get("/", (req, res) => {
  res.send("hello from server");
});

module.exports = router;
