const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  getNews,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/profile", getUser);
router.put("/profile", updateUser);
router.delete("/profile", deleteUser);
router.get("/news", getNews);

module.exports = router;
