/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("currencies").del();
  await knex("currencies").insert([
    {
      code: "USD",
      symbol: "$",
      name: "US Dollar",
      precision: 2,
      is_active: true,
    },
    {
      code: "RUB",
      symbol: "₽",
      name: "Russian Ruble",
      precision: 2,
      is_active: true,
    },
  ]);
};
