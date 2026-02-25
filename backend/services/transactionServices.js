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
  const [result] = await knex("transactions")
    .insert({
      user_id: userId,
      type,
      amount,
      currency_id: currencyId,
      category_id: categoryId,
      date: date,
      title,
    })
    .returning("*");

  if (!result) {
    throw ApiError.badRequest("Failed to create transaction");
  }

  const transaction = await knex("transactions as t")
    .join("currencies as c", "t.currency_id", "c.id")
    .join("categories as cat", "t.category_id", "cat.id")
    .select(
      "t.id",
      "t.type",
      "t.amount",
      "t.date",
      "t.title",
      "c.symbol as currency_symbol",
      "cat.name as category_name",
    )
    .where("t.id", transaction.id)
    .first();

  return transaction;
};

const getUserTransactions = async ({ userId, type }) => {
  const transactions = await knex("transactions as t")
    .join("currencies as c", "t.currency_id", "c.id")
    .join("categories as cat", "t.category_id", "cat.id")
    .where({ "t.user_id": userId, "t.type": type })
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

  return transactions;
};

const deleteUserTransaction = async ({ transactionId, userId }) => {
  const deletedCount = await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .del();

  if (deletedCount === 0) {
    throw ApiError.notFound("Transaction deletion error");
  }

  return;
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

  await knex("transactions")
    .where({ id: transactionId, user_id: userId })
    .update(updateData);

  const updatedTransaction = await knex("transactions as t")
    .join("currencies as c", "t.currency_id", "c.id")
    .join("categories as cat", "t.category_id", "cat.id")
    .where({ "t.id": transactionId, "t.user_id": userId })
    .select([
      "t.id",
      "t.type",
      "t.amount",
      "t.date",
      "t.title",
      "currency_id",
      "category_id",
      "c.symbol as currency_symbol",
      "cat.name as category_name",
    ]);

  return updatedTransaction;
};

module.exports = {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
};
