const express = require("express");
const { getUsers, deleteUser } = require("../controllers/adminController.js");
const router = express.Router();

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
