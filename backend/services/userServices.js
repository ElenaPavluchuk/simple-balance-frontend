const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");
const bcrypt = require("bcrypt");
const deleteImageFile = require("../utils/deleteImageFile.js");

const getUserById = async (id) => {
  const user = await knex("users")
    .where({ id })
    .select([
      "id",
      "email",
      "user_name",
      "profile_image_url",
      "user_role",
      "base_currency_id",
    ])
    .first();

  return user;
};

const deleteUserById = async (id) => {
  const user = await knex("users").where({ id }).first();

  if (user.profile_image_url) {
    deleteImageFile(user.profile_image_url);
  }

  const deletedCount = await knex("users").where({ id }).del();

  if (!deletedCount || deletedCount === 0) {
    throw ApiError.notFound("User to delete not found");
  }

  return deletedCount;
};

const updateUserById = async ({
  userId,
  userName,
  currentPassword,
  newPassword,
  imageUrl,
  removeProfileImage,
}) => {
  const user = await knex("users").where({ id: userId }).first();

  const updateData = {};

  if (userName) {
    updateData.user_name = userName.trim();
  }

  if (removeProfileImage && user.profile_image_url) {
    deleteImageFile(user.profile_image_url);
    updateData.profile_image_url = null;
  }

  if (imageUrl) {
    if (imageUrl && user.profile_image_url) {
      deleteImageFile(user.profile_image_url);
    }

    updateData.profile_image_url = imageUrl;
  }

  if (currentPassword && newPassword) {
    if (newPassword.length < 6) {
      throw ApiError.badRequest("Password must be at least 6 characters");
    }

    if (currentPassword === newPassword) {
      throw ApiError.badRequest(
        "New password must be different from current password",
      );
    }

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isValid) {
      throw ApiError.forbidden("Incorrect current password");
    }

    updateData.password_hash = await bcrypt.hash(newPassword, 7);
  }

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const [updatedUser] = await knex("users")
    .where({ id: userId })
    .update(updateData)
    .returning([
      "id",
      "email",
      "user_name",
      "profile_image_url",
      "user_role",
      "base_currency_id",
    ]);

  return updatedUser;
};

const getAllNews = async () => {
  const allNews = await knex("news")
    .select("id", "title", "content", "published_at", "author_id")
    .orderBy("published_at", "desc");

  return allNews;
};

const getCurrentRates = async (baseCurrencyCode, targetCurrencyCodes) => {
  const rows = await knex
    .select("c2.code as currency", "er.rate as value", "er.date")
    .from(
      knex.raw(
        `
        (
          SELECT DISTINCT ON (er.target_currency_id)
            er.*
          FROM exchange_rates er
          JOIN currencies c1 ON c1.id = er.base_currency_id
          JOIN currencies c2 ON c2.id = er.target_currency_id
          WHERE c1.code = ?
            AND c2.code = ANY(?)
          ORDER BY er.target_currency_id, er.date DESC
        ) as er
      `,
        [baseCurrencyCode, targetCurrencyCodes],
      ),
    )
    .join("currencies as c2", "c2.id", "er.target_currency_id");

  if (!rows) {
    throw ApiError.notFound("Exchange rates not found");
  }

  return rows;
};

module.exports = {
  getUserById,
  deleteUserById,
  updateUserById,
  getAllNews,
  getCurrentRates,
};
