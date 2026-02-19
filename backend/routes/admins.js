const express = require("express");
const {
  getUsers,
  deleteUser,
  getCurrencyRates,
  updateCurrencyRates,
} = require("../controllers/adminController.js");
const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.patch("/exchange-rates", updateCurrencyRates);
router.get("/exchange-rates", getCurrencyRates);

module.exports = router;
