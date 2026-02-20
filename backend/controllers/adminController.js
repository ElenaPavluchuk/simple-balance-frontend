const { getAllUsers, deleteUserById } = require("../services/adminServices.js");
const knex = require("../db.js");

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

const addNews = async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [createdNews] = await knex("news")
      .insert({
        title,
        content,
        author_id: userId,
      })
      .returning(["id"]);

    const newPost = await knex("news")
      .leftJoin("users", "news.author_id", "users.id")
      .select(
        "news.id",
        "news.title",
        "news.content",
        "news.published_at",
        "users.full_name as author_name",
      )
      .where("news.id", createdNews.id)
      .first();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllNews = async (_req, res) => {
  try {
    const allNews = await knex("news")
      .leftJoin("users", "news.author_id", "users.id")
      .select(
        "news.id",
        "news.title",
        "news.content",
        "news.published_at",
        "users.full_name as author_name",
      )
      .orderBy("news.published_at", "desc");

    return res.status(200).json(allNews);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error during fetching content" });
  }
};

const deleteNews = async (req, res) => {
  const newsId = Number(req.params.id);

  try {
    const deletedNews = await knex("news").where({ id: newsId }).del();

    if (deletedNews === 0) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error during deleting news" });
  }
};

const updateNews = async (req, res) => {
  const newsId = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const news = await knex("news").where({ id: newsId }).first();

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const updateData = Object.fromEntries(
      Object.entries({
        title,
        content,
      }).filter(([, value]) => value !== undefined),
    );

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const [updatedNews] = await knex("news")
      .where({ id: newsId })
      .update(updateData)
      .returning(["id", "title", "content"]);

    return res.status(200).json(updatedNews);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error during updating news" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  addNews,
  getAllNews,
  deleteNews,
  updateNews,
};
