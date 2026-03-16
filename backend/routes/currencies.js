const express = require("express");
const { getCurrencies } = require("../controllers/currenciesController.js");

const router = express.Router();

router.get("/", getCurrencies);

module.exports = router;
