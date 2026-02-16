const { getAllUsers, deleteUserById } = require("../services/adminServices.js");

const getUsers = async (_req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserById(id);

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  } catch (err) {
    next(err);
  }
};

// const getCurrencyRates = async (req, res) => {
//   try {
//     const rates = await knex("exchange_rates").select([
//       "target_currency_id",
//       "rate",
//       "effective_from",
//       "effective_to",
//       "updated_by",
//     ]);

//     res.status(200).json(rates);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error retrieving currency rates" });
//   }
// };

// const updateCurrencyRates = async (req, res) => {
//   //
// };
module.exports = {
  getUsers,
  deleteUser,
  //getCurrencyRates,
  // updateCurrencyRates,
};
