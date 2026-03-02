const express = require("express");
const auth = require("./auth.js");
const users = require("./users.js");
const transactions = require("./transactions.js");
const admins = require("./admins.js");
const authenticate = require("../middlewares/authentication.js");
const verifyRole = require("../middlewares/authorization.js");

const router = express.Router();

router.use("/auth", auth);
router.use("/users", authenticate, users);
router.use("/admins", authenticate, verifyRole("ADMIN"), admins);
router.use("/transactions", authenticate, transactions);

module.exports = router;
