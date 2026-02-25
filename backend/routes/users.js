const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  getNews,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get("/news", getNews);

module.exports = router;
