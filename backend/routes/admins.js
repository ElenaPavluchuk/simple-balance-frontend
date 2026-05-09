const express = require("express");
const {
  getUsers,
  deleteUser,
  addCurrencyRates,
  getAllRatesByBaseCurrency,
  deleteRatesByDate,
  addNews,
  deleteNews,
  updateNews,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/rates", addCurrencyRates);
router.get("/rates/:id", getAllRatesByBaseCurrency);
router.delete("/rates/:id/:date", deleteRatesByDate);
router.post("/news", addNews);
router.delete("/news/:id", deleteNews);
router.put("/news/:id", updateNews);

module.exports = router;
