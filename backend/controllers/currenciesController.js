const { getAllCurrencies } = require("../services/currenciesServer.js");

const getCurrencies = async (_req, res, next) => {
  try {
    const currencies = await getAllCurrencies();

    return res.status(200).json(currencies);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCurrencies };
