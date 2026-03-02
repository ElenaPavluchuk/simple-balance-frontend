const express = require("express");
const {
  register,
  login,
  getCurrencies,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);
router.get("/currencies", getCurrencies);

module.exports = router;
