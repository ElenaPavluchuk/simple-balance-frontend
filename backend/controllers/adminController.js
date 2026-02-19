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

module.exports = {
  getUsers,
  deleteUser,
};
