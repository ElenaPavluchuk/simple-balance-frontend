/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("categories").whereNull("user_id").del();
  await knex("categories").insert([
    { name: "Housing", type: "expense", user_id: null, is_active: true },
    { name: "Food", type: "expense", user_id: null, is_active: true },
    { name: "Transport", type: "expense", user_id: null, is_active: true },
    { name: "Entertainment", type: "expense", user_id: null, is_active: true },
    { name: "Gifts", type: "expense", user_id: null, is_active: true },
    { name: "Medecine", type: "expense", user_id: null, is_active: true },
    { name: "Health", type: "expense", user_id: null, is_active: true },
    { name: "Entertainment", type: "expense", user_id: null, is_active: true },
    { name: "Personal", type: "expense", user_id: null, is_active: true },
    { name: "Pets", type: "expense", user_id: null, is_active: true },
    { name: "House", type: "expense", user_id: null, is_active: true },
    { name: "Travel", type: "expense", user_id: null, is_active: true },
    { name: "Debt", type: "expense", user_id: null, is_active: true },
    { name: "Other", type: "expense", user_id: null, is_active: true },

    { name: "Salary", type: "income", user_id: null, is_active: true },
    { name: "Freelance", type: "income", user_id: null, is_active: true },
    { name: "Investments", type: "income", user_id: null, is_active: true },
    { name: "Savings", type: "income", user_id: null, is_active: true },
    { name: "Bonus", type: "income", user_id: null, is_active: true },
    { name: "Other", type: "income", user_id: null, is_active: true },
  ]);
};
