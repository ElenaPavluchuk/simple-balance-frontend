const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");

const addUserTransaction = async ({
  userId,
  type,
  amount,
  currencyId,
  categoryId,
  categoryName,
  date,
  title,
  notes,
}) => {
  if (!categoryId && categoryName) {
    let category = await knex("categories")
      .where({
        name: categoryName,
        type,
        user_id: userId,
      })
      .first();

    if (!category) {
      [category] = await knex("categories")
        .insert({
          name: categoryName,
          type,
          user_id: userId,
          is_active: true,
        })
        .returning("*");
    }
    categoryId = category.id;
  }

  const [inserted] = await knex("transactions")
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

  const transaction = await knex("transactions as t")
    .join("currencies as c", "t.currency_id", "c.id")
    .join("categories as cat", "t.category_id", "cat.id")
    .where("t.id", inserted.id)
    .select([
      "t.id",
      "t.user_id",
      "t.type",
      "t.amount",
      "t.date",
      "t.title",
      "t.notes",
      "t.currency_id",
      "t.category_id",
      "c.symbol as currency_symbol",
      "cat.name as category_name",
    ])
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
      "t.user_id",
      "t.type",
      "t.amount",
      "t.currency_id",
      "t.category_id",
      "t.date",
      "t.title",
      "t.notes",
      "c.symbol as currency_symbol",
      "cat.name as category_name",
    ])
    .orderBy("t.date", "desc")
    .orderBy("t.id", "desc");

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
  categoryName,
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

  if (!categoryId && categoryName) {
    let category = await knex("categories")
      .where({
        name: categoryName,
        type: transaction.type,
        user_id: userId,
      })
      .first();

    if (!category) {
      [category] = await knex("categories")
        .insert({
          name: categoryName,
          type: transaction.type,
          user_id: userId,
          is_active: true,
        })
        .returning("*");
    }
    categoryId = category.id;
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

  const [updatedTransaction] = await knex("transactions as t")
    .join("currencies as c", "t.currency_id", "c.id")
    .join("categories as cat", "t.category_id", "cat.id")
    .where({ "t.id": transactionId, "t.user_id": userId })
    .select([
      "t.id",
      "t.user_id",
      "t.type",
      "t.amount",
      "t.date",
      "t.title",
      "t.notes",
      "t.currency_id",
      "t.category_id",
      "c.symbol as currency_symbol",
      "cat.name as category_name",
    ]);

  return updatedTransaction;
};

const getData = async (userId) => {
  const user = await knex("users")
    .join("currencies", "users.base_currency_id", "currencies.id")
    .where("users.id", userId)
    .select("currencies.id as currency_id", "currencies.symbol as symbol")
    .first();

  const baseCurrencySymbol = user.symbol;

  const totals = await knex("transactions")
    .where({ user_id: userId })
    .first(
      knex.raw(`
      COALESCE(SUM(CASE WHEN type = 'INCOME'  THEN amount ELSE 0 END), 0) as total_income,
      COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0) as total_expense
    `),
    );

  const totalIncome = Number(totals.total_income);
  const totalExpense = Number(totals.total_expense);
  const totalBalance = totalIncome - totalExpense;

  const date30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const last30Totals = await knex("transactions as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("t.user_id", userId)
    .andWhere("t.date", ">=", date30DaysAgo)
    .first(
      knex.raw(`
      COALESCE(SUM(CASE WHEN t.type = 'INCOME'  THEN t.amount ELSE 0 END), 0) as total_income,
      COALESCE(SUM(CASE WHEN t.type = 'EXPENSE' THEN t.amount ELSE 0 END), 0) as total_expense
    `),
    );

  const last30Income = Number(last30Totals.total_income);
  const last30Expense = Number(last30Totals.total_expense);

  const last30ByCategory = await knex("transactions as t")
    .join("categories as c", "c.id", "t.category_id")
    .where("t.user_id", userId)
    .andWhere("t.date", ">=", date30DaysAgo)
    .select("t.type", "t.category_id", "c.name as category_name")
    .sum("t.amount as amount")
    .groupBy("t.type", "t.category_id", "c.name");

  const income = [];
  const expense = [];

  last30ByCategory.forEach((row) => {
    const item = {
      category_id: row.category_id,
      category_name: row.category_name,
      amount: Number(row.amount),
    };

    if (row.type === "INCOME") {
      income.push(item);
    } else {
      expense.push(item);
    }
  });

  const last5 = await knex("transactions as t")
    .join("categories as c", "c.id", "t.category_id")
    .where({ "t.user_id": userId })
    .select(
      "t.id",
      "t.type",
      "t.amount",
      "t.date",
      "t.title",
      "t.currency_id",
      "t.category_id",
      "c.name as category_name",
    )
    .orderBy("t.date", "desc")
    .limit(5);

  return {
    total: { totalBalance, totalIncome, totalExpense, baseCurrencySymbol },
    last30Days: {
      income: last30Income,
      expense: last30Expense,
      incomeByCategory: income,
      expenseByCategory: expense,
    },
    recent: {
      transactions: last5.map((t) => ({
        ...t,
        amount: Number(t.amount),
      })),
    },
  };
};

const getAllCategories = async (type) => {
  const categories = await knex("categories")
    .where({ type })
    .select("id", "name", "type", "user_id");

  return categories;
};

module.exports = {
  addUserTransaction,
  getUserTransactions,
  deleteUserTransaction,
  updateUserTransaction,
  getData,
  getAllCategories,
};
