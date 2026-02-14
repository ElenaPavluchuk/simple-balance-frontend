const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");

const addUserTransaction = async ({
  userId,
  type,
  amount,
  currencyId,
  categoryId,
  date,
  title,
}) => {
  const [transaction] = await knex("transactions")
    .insert({
      user_id: userId,
      type,
      amount,
      currency_id: currencyId,
      category_id: categoryId,
      date: date,
      title,
    })
    .returning([
      "id",
      "type",
      "amount",
      "currency_id",
      "category_id",
      "date",
      "title",
    ]);

  if (!transaction) {
    throw ApiError.badRequest("Failed to create transaction");
  }

  return transaction;
};

const getUserTransactions = async ({ userId, type }) => {
  const transactions = await knex("transactions")
    .where({ user_id: userId, type: type })
    .select([
      "id",
      "type",
      "amount",
      "currency_id",
      "category_id",
      "date",
      "title",
    ])
    .orderBy("date", "desc");

  return transactions;
};

const deleteUserTransaction = async ({ transactionId, userId }) => {
  const deletedCount = await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .del();

  if (deletedCount === 0) {
    throw ApiError.notFound("Transaction deletion error");
  }
};

const updateUserTransaction = async ({
  transactionId,
  userId,
  type,
  amount,
  currencyId,
  categoryId,
  date,
  title,
}) => {
  const transaction = await knex("transactions")
    .where({
      id: transactionId,
      user_id: userId,
    })
    .first();

  if (!transaction) {
    throw ApiError.notFound("Transaction not found");
  }

  const updateData = Object.fromEntries(
    Object.entries({
      type,
      amount,
      currency_id: currencyId,
      category_id: categoryId,
      date,
      title,
    }).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const [updatedTransaction] = await knex("transactions")
    .where({ id: transactionId })
    .update(updateData)
    .returning([
      "id",
      "type",
      "amount",
      "currency_id",
      "category_id",
      "date",
      "title",
    ]);

  return updatedTransaction;
};

module.exports = {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
};
