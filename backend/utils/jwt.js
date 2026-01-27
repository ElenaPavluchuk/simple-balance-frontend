const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7h" });
};

module.exports = generateAccessToken;
