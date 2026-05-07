const {
  getAllUsers,
  createNews,
  deleteNewsById,
  updateNewsById,
  addRates,
  getRatesByBase,
} = require("../services/adminServices.js");
const { deleteUserById } = require("../services/userServices.js");
const ApiError = require("../errors/apiError.js");

const getUsers = async (_req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    await deleteUserById(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const addNews = async (req, res, next) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  if (!title.trim() || !content.trim()) {
    return next(ApiError.badRequest("All fields are required"));
  }

  try {
    const newPost = await createNews({ userId, title, content });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

const deleteNews = async (req, res, next) => {
  const newsId = req.params.id;

  try {
    await deleteNewsById(newsId);

    return res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateNews = async (req, res, next) => {
  const newsId = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedNews = await updateNewsById({ newsId, title, content });

    return res.status(200).json(updatedNews);
  } catch (err) {
    next(err);
  }
};

const addCurrencyRates = async (req, res, next) => {
  const userId = req.user.id;
  const { baseCurrencyId, date, rates } = req.body;
  try {
    const result = await addRates({
      userId,
      baseCurrencyId,
      date,
      rates,
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllRatesByBaseCurrency = async (req, res, next) => {
  const baseCurrencyId = req.params.id;

  if (!baseCurrencyId || isNaN(baseCurrencyId)) {
    return next(ApiError.badRequest("Incorrect base currencie ID"));
  }

  try {
    const result = await getRatesByBase(baseCurrencyId);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  addNews,
  deleteNews,
  updateNews,
  addCurrencyRates,
  getAllRatesByBaseCurrency,
};
