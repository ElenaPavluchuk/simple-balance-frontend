const knex = require("../db.js");

const getAllCurrencies = async () => {
  const currencies = await knex("currencies").select(
    "id",
    "code",
    "symbol",
    "name",
  );

  return currencies;
};

module.exports = { getAllCurrencies };
