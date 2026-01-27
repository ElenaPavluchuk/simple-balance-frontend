const knex = require("../db.js");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/api.error.js");

const registerUser = async ({ email, password, fullName }) => {
  const existingUser = await knex("users").where({ email }).first();

  if (existingUser) {
    // throw new Error("USER_EXISTS");
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

module.exports = { registerUser };
