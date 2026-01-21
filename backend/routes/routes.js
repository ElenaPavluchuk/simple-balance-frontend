const express = require("express");
const transactions = require("./transactions.js");

const router = express.Router();
router.use("/transactions", transactions);

module.exports = router;
