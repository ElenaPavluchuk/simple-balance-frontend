const express = require("express");
const transactions = require("./transactions.js");
const users = require("./users.js")

const router = express.Router();
router.use("/transactions", transactions);
router.use("/users", users)

module.exports = router;
