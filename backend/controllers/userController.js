const knex = require("../db.js");
const bcrypt = require("bcrypt");

const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await knex("users")
      .where({ id: userId })
      .select(["id", "email", "full_name", "profile_image_url"])
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // TODO: нужно удалить image перед вызовом del()
    const deletedUser = await knex("users").where({ id: userId }).del();

    if (deletedUser === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const { fullName, currentPassword, newPassword } = req.body;

  try {
    const user = await knex("users").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};

    if (fullName) {
      updateData.full_name = fullName;
    }

    if (req.file) {
      // TODO: remove profile image also
      updateData.profile_image_url = req.file.path;
    }

    if (currentPassword && newPassword) {
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password must be different from current password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

      if (!isMatch) {
        return res.status(403).json({ message: "Incorrect password" });
      }

      updateData.password_hash = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const [updatedUser] = await knex("users")
      .where({ id: userId })
      .update(updateData)
      .returning(["id", "email", "full_name", "profile_image_url"]);

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, deleteUser, updateUser };
