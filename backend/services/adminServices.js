const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");

const getAllUsers = async () => {
  const allUsers = await knex("users").select(
    "id",
    "email",
    "user_name",
    "profile_image_url",
    "user_role",
    "base_currency_id",
  );

  return allUsers;
};

const createNews = async ({ userId, title, content }) => {
  const [newPost] = await knex("news")
    .insert({
      title,
      content,
      author_id: userId,
    })
    .returning(["id", "title", "content", "published_at", "author_id"]);

  return newPost;
};

const deleteNewsById = async (id) => {
  const deletedCount = await knex("news").where({ id }).del();

  if (!deletedCount || deletedCount === 0) {
    throw ApiError.notFound("News not found");
  }

  return;
};

const updateNewsById = async ({ newsId, title, content }) => {
  const news = await knex("news").where({ id: newsId }).first();

  if (!news) {
    throw ApiError.notFound("News not found");
  }

  const updateData = Object.fromEntries(
    Object.entries({
      title,
      content,
    }).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const [updatedNews] = await knex("news")
    .where({ id: newsId })
    .update(updateData)
    .returning(["id", "title", "content"]);

  return updatedNews;
};

const addRates = async ({ base, date, rates, userId }) => {
  if (!base || !date || !rates?.length) {
    throw new Error("Invalid payload");
  }

  // 1. Получаем base currency
  const baseCurrency = await knex("currencies").where({ code: base }).first();

  if (!baseCurrency) {
    throw new Error("Base currency not found");
  }

  // 2. Получаем target currencies
  const targetCurrencies = await knex("currencies").whereIn(
    "code",
    rates.map((r) => r.currency),
  );

  const currencyMap = Object.fromEntries(
    targetCurrencies.map((c) => [c.code, c.id]),
  );

  // 3. Готовим данные для вставки
  const rowsToInsert = rates.map((rate) => {
    const targetId = currencyMap[rate.currency];

    if (!targetId) {
      throw new Error(`Currency ${rate.currency} not found`);
    }

    if (rate.value <= 0) {
      throw new Error(`Invalid rate for ${rate.currency}`);
    }

    return {
      base_currency_id: baseCurrency.id,
      target_currency_id: targetId,
      rate: rate.value,
      date,
      updated_by: userId,
    };
  });

  // 4. Вставка с UPSERT (очень важно!)
  const inserted = await knex("exchange_rates")
    .insert(rowsToInsert)
    .onConflict(["base_currency_id", "target_currency_id", "date"])
    .merge({
      rate: knex.raw("EXCLUDED.rate"),
      updated_by: knex.raw("EXCLUDED.updated_by"),
      updated_at: knex.fn.now(),
    })
    .returning("*");

  return inserted;
};

module.exports = {
  getAllUsers,
  createNews,
  deleteNewsById,
  updateNewsById,
  addRates,
};
