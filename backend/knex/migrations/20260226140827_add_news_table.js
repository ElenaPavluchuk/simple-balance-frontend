/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("news", (table) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.text("content").notNullable();
    table
      .integer("author_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table.timestamp("published_at").notNullable().defaultTo(knex.fn.now());
    table.timestamps(true, true);
    table.index(["author_id"]);
    table.index(["published_at"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("news");
};
