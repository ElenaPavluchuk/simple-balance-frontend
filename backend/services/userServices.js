const knex = require("../db.js");
const ApiError = require("../errors/apiError.js");
const bcrypt = require("bcrypt");

const getUserById = async (userId) => {
  const user = await knex("users")
    .where({ id: userId })
    .select(["id", "email", "full_name", "profile_image_url"])
    .first();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

const deleteUserById = async (userId) => {
  // TODO: нужно удалить image перед вызовом del()
  const deletedUser = await knex("users").where({ id: userId }).del();

  if (!deletedUser || deletedUser === 0) {
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

  if (!user) {
    throw ApiError.notFound("User to update not found");
  }

  const updateData = {};

  if (fullName) {
    updateData.full_name = fullName;
  }

  if (imageUrl) {
    // TODO: remove profile image also
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

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      throw ApiError.forbidden("Incorrect password");
    }

    updateData.password_hash = await bcrypt.hash(newPassword, 10);
  }

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const [updatedUser] = await knex("users")
    .where({ id: userId })
    .update(updateData)
    .returning(["id", "email", "full_name", "profile_image_url"]);

  return updatedUser;
};

const getAllNews = async () => {
  const allNews = await knex("news")
    .leftJoin("users", "news.author_id", "users.id")
    .select(
      "news.id",
      "news.title",
      "news.content",
      "news.published_at",
      "users.full_name as author_name",
    )
    .orderBy("news.published_at", "desc");

  return allNews;
};

module.exports = { getUserById, deleteUserById, updateUserById, getAllNews };
