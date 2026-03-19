/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("categories", (table) => {
    table.dropUnique(["name", "type", "user_id"]);
  });

  await knex.raw(`
    CREATE UNIQUE INDEX categories_unique_system
    ON categories (name, type)
    WHERE user_id IS NULL;
  `);

  await knex.raw(`
    CREATE UNIQUE INDEX categories_unique_user
    ON categories (name, type, user_id)
    WHERE user_id IS NOT NULL;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
    DROP INDEX IF EXISTS categories_unique_system;
  `);

  await knex.raw(`
    DROP INDEX IF EXISTS categories_unique_user;
  `);

  await knex.schema.alterTable("categories", (table) => {
    table.unique(["name", "type", "user_id"]);
  });
};
