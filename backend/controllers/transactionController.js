const {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
} = require("../services/transactionServices.js");

const addTransaction = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const transaction = await addUserTransaction({
      userId,
      ...req.body,
    });

    return res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

const getTransactions = async (req, res, next) => {
  const userId = req.user.id;
  const { type } = req.query;

  try {
    const transactions = await getUserTransactions({ userId, type });

    return res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

const deleteTransaction = async (req, res, next) => {
  const transactionId = Number(req.params.id);
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
  const transactionId = Number(req.params.id);
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

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
