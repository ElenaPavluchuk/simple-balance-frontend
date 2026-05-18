const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getDashboardData,
  getCategories,
} = require("../controllers/transactionController.js");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/dashboard", getDashboardData);
router.get("/categories", getCategories);

module.exports = router;
