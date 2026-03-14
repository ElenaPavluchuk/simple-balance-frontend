const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
  const user = await knex("users")
    .where({ id })
    .select([
      "id",
      "email",
      "full_name",
      "profile_image_url",
      "user_role",
      "base_currency_id",
    ])
    .first();

  return user;
};

const deleteUserById = async (id) => {
  const deletedCount = await knex("users").where({ id }).del();

  if (!deletedCount || deletedCount === 0) {
    throw ApiError.notFound("User to delete not found");
  }

  return;
};

const updateUserById = async ({
  userId,
  fullName,
  currentPassword,
  newPassword,
  imageUrl,
}) => {
  const user = await knex("users").where({ id: userId }).first();

  const updateData = {};

  if (fullName) {
    updateData.full_name = fullName.trim();
  }

  if (imageUrl) {
    updateData.profile_image_url = imageUrl.path;
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
      throw ApiError.forbidden("Incorrect password");
    }

    updateData.password_hash = await bcrypt.hash(newPassword, 7);
  }

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const [updatedUser] = await knex("users")
    .where({ id: userId })
    .update(updateData)
    .returning(["id", "full_name", "profile_image_url"]);

  return updatedUser;
};

const getAllNews = async () => {
  const allNews = await knex("news")
    .select("id", "title", "content", "published_at", "author_id")
    .orderBy("published_at", "desc");

  return allNews;
};

module.exports = { getUserById, deleteUserById, updateUserById, getAllNews };
