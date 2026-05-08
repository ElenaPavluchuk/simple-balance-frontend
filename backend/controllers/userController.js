const ApiError = require("../errors/apiError.js");
const {
  getUserById,
  deleteUserById,
  updateUserById,
  getAllNews,
  getCurrentRates,
} = require("../services/userServices.js");

const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await getUserById(userId);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    await deleteUserById(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const { userName, currentPassword, newPassword, removeProfileImage } =
    req.body;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : undefined;

  try {
    const updatedUser = await updateUserById({
      userId,
      userName,
      currentPassword,
      newPassword,
      imageUrl,
      removeProfileImage,
    });

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    next(err);
  }
};

const getNews = async (_req, res, next) => {
  try {
    const allNews = await getAllNews();

    return res.status(200).json(allNews);
  } catch (err) {
    next(err);
  }
};

const getExchangeRates = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const exchangeRates = await getCurrentRates(userId);

    return res.status(200).json(exchangeRates);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, deleteUser, updateUser, getNews, getExchangeRates };
