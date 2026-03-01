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
  notes,
}) => {
  const [transaction] = await knex("transactions")
    .insert({
      user_id: userId,
      type,
      amount,
      currency_id: currencyId,
      category_id: categoryId,
      date,
      title,
      notes,
    })
    .returning("*");

  return transaction;
};

const getUserTransactions = async ({ userId, type }) => {
  const transactions = await knex("transactions")
    .where({ user_id: userId, type: type })
    .select("*")
    .orderBy("date", "desc");

  return transactions;
};

const deleteUserTransaction = async ({ transactionId, userId }) => {
  const deletedCount = await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .del();

  if (!deletedCount || deletedCount === 0) {
    throw ApiError.notFound("Transaction deletion error");
  }

  return;
};

const updateUserTransaction = async ({
  transactionId,
  userId,
  amount,
  categoryId,
  date,
  title,
  notes,
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
      amount,
      category_id: categoryId,
      date,
      title,
      notes,
    }).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .update(updateData);

  const [updatedTransaction] = await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .select(["id", "amount", "date", "title", "notes", "category_id"]);

  return updatedTransaction;
};

module.exports = {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
};
