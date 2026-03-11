const {
  registerUser,
  loginUser,
  getAllCurrencies,
} = require("../services/authServices.js");
const generateAccessToken = require("../utils/jwt.js");
const ApiError = require("../errors/apiError.js");

const register = async (req, res, next) => {
  const { email, password, fullName, currencyId } = req.body;

  if (!email?.trim() || !password.trim() || !fullName?.trim() || !currencyId) {
    return next(ApiError.badRequest("All fields are required"));
  }

  if (password.length < 6) {
    return next(ApiError.badRequest("Password must be at least 6 characters"));
  }

  try {
    const user = await registerUser({ email, password, fullName, currencyId });
    const token = generateAccessToken(user.id, user.user_role);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return next(ApiError.badRequest("Email and password are required"));
  }

  try {
    const user = await loginUser({ email, password });
    const token = generateAccessToken(user.id, user.user_role);

    return res
      .status(200)
      .json({ message: "User login successfully", token, user });
  } catch (err) {
    next(err);
  }
};

const getCurrencies = async (_req, res, next) => {
  try {
    const currencies = await getAllCurrencies();

    return res.status(200).json(currencies);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getCurrencies };
