const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController.js");
const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

module.exports = router;
