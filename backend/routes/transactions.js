const express = require("express");
const router = express.Router();
const knex = require("../db.js");

router.post("/", async (req, res) => {
  const { userId } = req.query;
  const { type, amount, currencyId, categoryId, date, title } = req.body;

  try {
    const result = await knex("transactions")
      .insert({
        user_id: userId,
        type,
        amount,
        currency_id: currencyId,
        category_id: categoryId,
        date,
        title,
      })
      .returning("*");

    res.status(201).json(result[0]);
  } catch (err) {
    console.error("error created transaction: ", err);
    res.status(500).json({ error: "error created transaction" });
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await knex("transactions").where({ user_id: userId });

    res.status(200).json(result);
  } catch (err) {
    console.error("error getting transactions: ", err);
    res.status(500).json({ error: "error getting transactions" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await knex("transactions")
      .where({ id })
      .del()
      .returning("*");

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("error deliting transaction: ", err);
    res.status(500).json({ error: "error deliting transaction" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { type, amount, currencyId, categoryId, date, title } = req.body;

  try {
    const result = await knex("transactions")
      .where({ id })
      .update({
        type,
        amount,
        currency_id: currencyId,
        category_id: categoryId,
        date,
        title,
      })
      .returning("*");

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("error updating transaction: ", err);
    res.status(500).json({ error: "error updating transaction" });
  }
});

module.exports = router;
