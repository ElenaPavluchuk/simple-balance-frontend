/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const usd = await knex("currencies").where({ code: "USD" }).first();

  if (!usd) {
    throw new Error("USD currency not found. Run currencies seed first.");
  }

  const [user] = await knex("users")
    .insert({
      email: "test@test.com",
      password_hash: "test", // временно
      user_role: "admin",
      base_currency_id: usd.id,
    })
    .returning("*");

  console.log("Test user id:", user.id);
};
