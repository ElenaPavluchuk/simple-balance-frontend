const knex = require("../db.js");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");

const registerUser = async ({ email, fullName, password, currencyId }) => {
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

  const [user] = await knex("users")
    .insert({
      email: email,
      password_hash: passwordHash,
      full_name: fullName,
      user_role: "MEMBER",
      base_currency_id: baseCurrency.id,
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
