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

const addRates = async ({ baseCurrencyId, date, rates, userId }) => {
  if (!baseCurrencyId || !date || !rates?.length) {
    throw new Error("Invalid payload");
  }

  const dataToInsert = rates.map(({ targetCurrencyId, value }) => ({
    base_currency_id: baseCurrencyId,
    target_currency_id: targetCurrencyId,
    rate: value,
    date,
    updated_by: userId,
  }));

  const insertedOrUpdated = await knex("exchange_rates")
    .insert(dataToInsert)
    .onConflict(["base_currency_id", "target_currency_id", "date"])
    .merge()
    .returning("*");

  return {
    message: "Currency rates have been successfully added",
    rates: insertedOrUpdated,
  };
};

module.exports = {
  getAllUsers,
  createNews,
  deleteNewsById,
  updateNewsById,
  addRates,
};
