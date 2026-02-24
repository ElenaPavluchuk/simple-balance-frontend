const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
