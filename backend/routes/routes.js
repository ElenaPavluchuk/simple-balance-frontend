const express = require("express");
const transactions = require("./transactions.js");
const users = require("./users.js");
const admins = require("./admins.js");
const authenticate = require("../middlewares/authentication.js");
const verifyRole = require("../middlewares/authorization.js");

const router = express.Router();
router.use("/transactions", transactions);
router.use("/users", users);
router.use("/admins", authenticate, verifyRole("admin"), admins);

module.exports = router;
