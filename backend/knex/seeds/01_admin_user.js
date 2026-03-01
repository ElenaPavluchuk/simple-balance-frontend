const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();

  const usd = await knex("currencies").where({ code: "USD" }).first();

  if (!usd) {
    throw new Error("USD currency not found");
  }

  const [admin] = await knex("users")
    .insert({
      email: process.env.ADMIN_EMAIL,
      password_hash: bcrypt.hashSync(
        process.env.ADMIN_PASSWORD,
        bcrypt.genSaltSync(7),
      ),
      full_name: "System Admin",
      profile_image_url: null,
      user_role: "ADMIN",
      base_currency_id: usd.id,
    })
    .returning(["id", "email", "user_role"]);

  console.log("admin user created:", admin);
};
