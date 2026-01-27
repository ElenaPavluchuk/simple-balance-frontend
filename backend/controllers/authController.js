const knex = require("../db.js");
const bcrypt = require("bcrypt");
const { registerUser } = require("../services/auth.services.js");
const generateAccessToken = require("../utils/jwt.js");
const ApiError = require("../errors/api.error.js");

const register = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  // валидацию нужно вынести в middleware и передать перед контроллером в роуте
  if (!email?.trim() || !password?.trim() || !fullName?.trim()) {
    return next(ApiError.badRequest("Email, password and name are required"));
  }

  if (password.length < 6) {
    return next(ApiError.badRequest("Password must be at least 6 characters"));
  }

  try {
    const user = await registerUser({ email, password, fullName });
    const token = generateAccessToken(user.id, user.user_role);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateAccessToken(user.id, user.user_role);

    return res
      .status(200)
      .json({ message: "User login successfully", token, userId: user.id });
  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ message: "login error" });
  }
};

module.exports = { register, login };
