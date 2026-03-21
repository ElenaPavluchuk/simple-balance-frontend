const {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
  getData,
  getAllCategories,
} = require("../services/transactionServices.js");
const knex = require("../db.js");
const xlsx = require("xlsx");
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
    notes,
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
      notes,
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
    await deleteUserTransaction({ transactionId, userId });

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
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

const downloadTransactions = async (req, res, next) => {
  const userId = req.user.id;
  const { type } = req.query;

  if (!type) {
    return res.status(500).json({ message: "type is required" });
  }

  try {
    // TODO: test and refactoring
    const transactions = await knex("transactions as t")
      .join("currencies as c", "t.currency_id", "c.id")
      .join("categories as cat", "t.category_id", "cat.id")
      .where({
        "t.user_id": userId,
        "t.type": type,
      })
      .select([
        "t.id",
        "t.type",
        "t.amount",
        "t.date",
        "t.title",
        "c.symbol as currency_symbol",
        "cat.name as category_name",
      ])
      .orderBy("t.date", "desc");

    const data = transactions.map((t) => ({
      Category: t.category_name,
      Title: t.title,
      Amount: t.amount,
      Currency: t.currency_symbol,
      Date: t.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, type);

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    const filename = `${type}.xlsx`;

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.send(buffer);
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
  downloadTransactions,
  getDashboardData,
  getCategories,
};
