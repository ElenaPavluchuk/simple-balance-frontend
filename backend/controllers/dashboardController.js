const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");

const getDashboardData = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const date30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Получаем базовую валюту пользователя
    const [user] = await knex("users")
      .join("currencies", "users.base_currency_id", "currencies.id")
      .where("users.id", userId)
      .select("currencies.id as currency_id", "currencies.symbol as symbol")
      .first();

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    const baseCurrencyId = user.currency_id;
    const baseSymbol = user.symbol;

    // Все суммы в базовой валюте
    const [totals] = await knex("transactions")
      .where("user_id", userId)
      .andWhere("currency_id", baseCurrencyId)
      .select(
        knex.raw(`
          COALESCE(SUM(CASE WHEN type = 'income'  THEN amount ELSE 0 END), 0) as total_income,
          COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
        `),
      );

    const totalIncome = Number(totals.total_income);
    const totalExpense = Number(totals.total_expense);
    const totalBalance = totalIncome - totalExpense;

    // Последние 30 дней
    const [last30Totals] = await knex("transactions")
      .where("user_id", userId)
      .andWhere("currency_id", baseCurrencyId)
      .andWhere("date", ">=", date30DaysAgo)
      .select(
        knex.raw(`
          COALESCE(SUM(CASE WHEN type = 'income'  THEN amount ELSE 0 END), 0) as total_income,
          COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
        `),
      );

    const last30Income = Number(last30Totals.total_income);
    const last30Expense = Number(last30Totals.total_expense);

    // По категориям за 30 дней
    const last30ByCategory = await knex("transactions as t")
      .join("categories as c", "t.category_id", "c.id")
      .where("t.user_id", userId)
      .andWhere("t.currency_id", baseCurrencyId)
      .andWhere("t.date", ">=", date30DaysAgo)
      .select("c.name as category", "t.type")
      .sum("t.amount as total")
      .groupBy("c.name", "t.type")
      .orderBy([{ column: "type" }, { column: "total", order: "desc" }]);

    const incomeByCategory = last30ByCategory
      .filter((r) => r.type === "income")
      .map((r) => ({ category: r.category, total: Number(r.total) }));

    const expenseByCategory = last30ByCategory
      .filter((r) => r.type === "expense")
      .map((r) => ({ category: r.category, total: Number(r.total) }));

    // Последние 5 операций
    const last5 = await knex("transactions as t")
      .join("currencies as cur", "t.currency_id", "cur.id")
      .join("categories as cat", "t.category_id", "cat.id")
      .where("t.user_id", userId)
      .andWhere("t.currency_id", baseCurrencyId)
      .select(
        "t.id",
        "t.type",
        "t.amount",
        "t.date",
        "t.title",
        "cur.symbol as currency_symbol",
        "cat.name as category_name",
      )
      .orderBy("t.date", "desc")
      .limit(5);

    res.status(200).json({
      currency: { symbol: baseSymbol },
      total: { totalBalance, totalIncome, totalExpense },
      last30Days: {
        income: last30Income,
        expense: last30Expense,
        incomeByCategory,
        expenseByCategory,
      },
      recent: { transactions: last5 },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardData };
