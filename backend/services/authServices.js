const knex = require("../db.js");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");

const registerUser = async ({ email, password, fullName }) => {
  const existingUser = await knex("users").where({ email }).first();

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 7);
  const usd = await knex("currencies").where({ code: "USD" }).first();

  if (!usd) {
    throw ApiError.notFound("USD currency not found");
  }

  const [user] = await knex("users")
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      full_name: fullName.trim(),
      user_role: "MEMBER",
      base_currency_id: usd.id,
    })
    .returning(["id", "user_role"]);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await knex("users")
    .where({ email })
    .select(["id", "password_hash", "user_role"])
    .first();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const { password_hash, ...safeUser } = user;

  const isValid = await bcrypt.compare(password, password_hash);

  if (!isValid) {
    throw ApiError.unauthorized("Wrong password");
  }

  return safeUser;
};

module.exports = { registerUser, loginUser };
