/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("categories").whereNull("user_id").del();
  await knex("categories").insert([
    { name: "Housing", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Food", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Transport", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Entertainment", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Gifts", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Medecine", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Health", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Entertainment", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Personal", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Pets", type: "EXPENSE", user_id: null, is_active: true },
    { name: "House", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Travel", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Debt", type: "EXPENSE", user_id: null, is_active: true },
    { name: "Other", type: "EXPENSE", user_id: null, is_active: true },

    { name: "Salary", type: "INCOME", user_id: null, is_active: true },
    { name: "Freelance", type: "INCOME", user_id: null, is_active: true },
    { name: "Investments", type: "INCOME", user_id: null, is_active: true },
    { name: "Savings", type: "INCOME", user_id: null, is_active: true },
    { name: "Bonus", type: "INCOME", user_id: null, is_active: true },
    { name: "Other", type: "INCOME", user_id: null, is_active: true },
  ]);
};
