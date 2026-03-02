const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  downloadTransactions,
  getDashboardData,
} = require("../controllers/transactionController.js");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/download", downloadTransactions);
router.get("/dashboard", getDashboardData);

module.exports = router;
