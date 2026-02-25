const {
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../services/userServices.js");

const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await getUserById(userId);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    await deleteUserById(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const { fullName, currentPassword, newPassword } = req.body;

  try {
    const updatedUser = await updateUserById({
      userId,
      fullName,
      currentPassword,
      newPassword,
      imageUrl: req.file,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, deleteUser, updateUser };
