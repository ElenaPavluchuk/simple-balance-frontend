const knex = require("../db.js");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/api.error.js");

const registerUser = async ({ email, password, fullName }) => {
  const existingUser = await knex("users").where({ email }).first();

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 7);

  const [user] = await knex("users")
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      full_name: fullName.trim(),
      user_role: "member",
    })
    .returning(["id"]);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await knex("users").where({ email }).first();
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw ApiError.unauthorized("Wrong password");
  }

  return user;
};

module.exports = { registerUser, loginUser };
