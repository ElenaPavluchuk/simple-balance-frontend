const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  getNews,
} = require("../controllers/userController.js");
const upload = require("../middlewares/upload.js");

const router = express.Router();

router.get("/profile", getUser);
router.put("/profile", upload.single("profileImage"), updateUser);
router.delete("/profile", deleteUser);
router.get("/news", getNews);

module.exports = router;
