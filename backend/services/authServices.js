const knex = require("../db.js");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");

const registerUser = async ({ email, userName, password, currencyId }) => {
  const existingUser = await knex("users").where({ email }).first();

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 7);

  const baseCurrency = await knex("currencies")
    .where({ id: currencyId })
    .first();

  if (!baseCurrency) {
    throw ApiError.notFound("Currency not found");
  }

  const [createdUser] = await knex("users")
    .insert({
      email,
      password_hash: passwordHash,
      user_name: userName,
      user_role: "MEMBER",
      base_currency_id: baseCurrency.id,
    })
    .returning("id");

  const user = await knex("users")
    .join("currencies", "users.base_currency_id", "currencies.id")
    .where("users.id", createdUser.id)
    .select(
      "users.id",
      "users.email",
      "users.user_name",
      "users.profile_image_url",
      "users.user_role",
      "users.base_currency_id",
      "currencies.code as currency_code",
      "currencies.symbol as currency_symbol",
    )
    .first();

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await knex("users")
    .join("currencies", "users.base_currency_id", "currencies.id")
    .where("users.email", email)
    .select([
      "users.id",
      "users.password_hash",
      "users.email",
      "users.user_name",
      "users.profile_image_url",
      "users.user_role",
      "users.base_currency_id",
      "currencies.code as currency_code",
      "currencies.symbol as currency_symbol",
    ])
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
