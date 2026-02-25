const express = require("express");
const {
  getUsers,
  deleteUser,
  // getCurrencyRates,
  // updateCurrencyRates,
  addNews,
  deleteNews,
  updateNews,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
// TODO:
// router.patch("/exchange-rates", updateCurrencyRates);
// router.get("/exchange-rates", getCurrencyRates);
router.post("/news", addNews);
router.delete("/news/:id", deleteNews);
router.put("/news/:id", updateNews);

module.exports = router;
