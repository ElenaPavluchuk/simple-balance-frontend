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
const deleteUserById = async (id) => {
  const deletedUser = await knex("users")
    .where({ id })
    .del()
    .returning(["full_name"]);

  if (!deletedUser || deletedUser.length === 0) {
    throw ApiError.notFound("User not found");
  }

  return deletedUser;
};

module.exports = { getAllUsers, deleteUserById };
