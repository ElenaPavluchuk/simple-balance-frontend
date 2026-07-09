const knex = require("../db.js");

const getAllCurrencies = async () => {
  const currencies = await knex("currencies").select(
    "id",
    { name: "code" },
    "symbol",
  );

  return currencies;
};

module.exports = { getAllCurrencies };
