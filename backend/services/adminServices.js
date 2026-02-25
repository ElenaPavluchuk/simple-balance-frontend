const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");

const getAllUsers = async () => {
  const allUsers = await knex("users").select(
    "id",
    "email",
    "user_role",
    "full_name",
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
    .returning([
      "news.id",
      "news.title",
      "news.content",
      "news.published_at",
      knex.raw(`(
        SELECT full_name 
        FROM users 
        WHERE users.id = news.author_id
      ) as author_name`),
    ]);

  return newPost;
};

const deleteNewsById = async (newsId) => {
  const deletedNews = await knex("news").where({ id: newsId }).del();

  if (deletedNews === 0) {
    throw ApiError.notFound("News not found");
  }
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

module.exports = {
  getAllUsers,
  createNews,
  deleteNewsById,
  updateNewsById,
};
