const {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
  getData,
  getAllCategories,
} = require("../services/transactionServices.js");
const ApiError = require("../errors/apiError.js");

const addTransaction = async (req, res, next) => {
  const userId = req.user.id;
  const {
    type,
    amount,
    currencyId,
    categoryId,
    categoryName,
    date,
    title,
    note,
  } = req.body;

  if (
    !type ||
    !amount ||
    !currencyId ||
    !date ||
    !title.trim() ||
    (!categoryId && !categoryName)
  ) {
    return next(
      ApiError.badRequest(
        "Required fields: type, amount, currency, date, title and categoryId or categoryName",
      ),
    );
  }

  try {
    const transaction = await addUserTransaction({
      userId,
      type,
      amount,
      currencyId,
      categoryId,
      categoryName,
      date,
      title,
      note,
    });

    return res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

const getTransactions = async (req, res, next) => {
  const userId = req.user.id;
  const { type } = req.query;

  if (!type) {
    return next(ApiError.badRequest("Type is required field"));
  }

  try {
    const transactions = await getUserTransactions({ userId, type });

    return res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

const deleteTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  const userId = req.user.id;

  try {
    const deletedTransaction = await deleteUserTransaction({
      transactionId,
      userId,
    });

    return res
      .status(200)
      .json({
        deletedTransaction,
        message: "Transaction deleted successfully",
      });
  } catch (err) {
    next(err);
  }
};

const updateTransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  const userId = req.user.id;

  try {
    const updatedTransaction = await updateUserTransaction({
      transactionId,
      userId,
      ...req.body,
    });

    return res.status(200).json(updatedTransaction);
  } catch (err) {
    next(err);
  }
};

const getDashboardData = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const data = await getData(userId);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  const { type } = req.query;

  if (!type) {
    return next(ApiError.badRequest("Type is required field"));
  }

  try {
    const categories = await getAllCategories(type);

    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getDashboardData,
  getCategories,
};
