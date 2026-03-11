const express = require("express");
const {
  updateUser,
  deleteUser,
  getNews,
} = require("../controllers/userController.js");

const router = express.Router();

router.put("/profile", updateUser);
router.delete("/profile", deleteUser);
router.get("/news", getNews);

module.exports = router;
