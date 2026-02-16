const express = require("express");
const transactions = require("./transactions.js");
const auth = require("./auth.js");
const admins = require("./admins.js");
const authenticate = require("../middlewares/authentication.js");
const verifyRole = require("../middlewares/authorization.js");

const router = express.Router();
router.use("/transactions", authenticate, transactions);
router.use("/auth", auth);
router.use("/admins", authenticate, verifyRole("admin"), admins);

module.exports = router;
