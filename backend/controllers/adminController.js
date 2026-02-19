const { getAllUsers, deleteUserById } = require("../services/adminServices.js");
const knex = require("../db.js");

const getUsers = async (_req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserById(id);

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  } catch (err) {
    next(err);
  }
};

const getCurrencyRates = async (req, res) => {
  const userId = req.user.id;
  const now = new Date().toISOString().split("T")[0];

  try {
    const user = await knex("users")
      .select("base_currency_id")
      .where({ id: userId })
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rates = await knex
      .select("c.code", "er.rate")
      .from(
        knex.raw(
          `
          (
            SELECT DISTINCT ON (target_currency_id) *
            FROM exchange_rates
            WHERE base_currency_id = ?
              AND effective_from <= ?
              AND (effective_to IS NULL OR effective_to >= ?)
            ORDER BY target_currency_id, effective_from DESC, created_at DESC
          ) er
        `,
          [user.base_currency_id, now, now],
        ),
      )
      .join("currencies as c", "c.id", "er.target_currency_id");

    const result = Object.fromEntries(
      rates.map((r) => [r.code, Number(r.rate)]),
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error retrieving currency rates" });
  }
};

const updateCurrencyRates = async (req, res) => {
  const { rates } = req.body;
  const adminId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  if (!rates || typeof rates !== "object" || Object.keys(rates).length === 0) {
    return res.status(400).json({ message: "Invalid or missing rates data" });
  }

  const trx = await knex.transaction();

  try {
    //  Получаем базовую валюту пользователя
    const user = await trx("users")
      .select("base_currency_id")
      .where({ id: adminId })
      .first();

    if (!user) {
      await trx.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const baseCurrencyId = user.base_currency_id;

    const codes = Object.keys(rates);

    // Получаем все target валюты одним запросом
    const currencies = await trx("currencies")
      .select("id", "code")
      .whereIn("code", codes)
      .andWhere("is_active", true);

    if (!currencies.length) {
      await trx.rollback();
      return res.status(400).json({ message: "No valid currencies found" });
    }

    const currencyMap = new Map(currencies.map((c) => [c.code, c.id]));

    const targetCurrencyIds = [];
    const insertData = [];

    for (const code of codes) {
      const rateValue = rates[code];
      const targetId = currencyMap.get(code);

      if (!targetId || typeof rateValue !== "number") continue;
      if (targetId === baseCurrencyId) continue;

      targetCurrencyIds.push(targetId);

      insertData.push({
        base_currency_id: baseCurrencyId,
        target_currency_id: targetId,
        rate: rateValue,
        effective_from: today,
        source: "manual",
        updated_by: adminId,
      });
    }

    if (!insertData.length) {
      await trx.rollback();
      return res.status(400).json({ message: "No valid rates to insert" });
    }

    // Закрываем старые курсы одним UPDATE
    await trx("exchange_rates")
      .where("base_currency_id", baseCurrencyId)
      .whereIn("target_currency_id", targetCurrencyIds)
      .whereNull("effective_to")
      .update({
        effective_to: today,
        updated_at: knex.fn.now(),
      });

    // Вставляем новые курсы одним INSERT
    await trx("exchange_rates").insert(insertData);

    await trx.commit();

    res.status(200).json({
      message: "Currency rates updated successfully",
      updated: insertData.length,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    res.status(500).json({
      message: "Server error updating currency rates",
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getCurrencyRates,
  updateCurrencyRates,
};
