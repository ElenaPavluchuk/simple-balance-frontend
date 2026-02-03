const knex = require("../db.js");

const getUsers = async (_req, res) => {
  try {
    const allUsers = await knex("users").select(
      "id",
      "email",
      "user_role",
      "full_name",
    );

    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during fetching users" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await knex("users")
      .where({ id })
      .del()
      .returning(["full_name"]);

    if (!deletedUser || deletedUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during deleted user" });
  }
};

module.exports = { getUsers, deleteUser };
