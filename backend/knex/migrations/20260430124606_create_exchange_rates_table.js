/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("exchange_rates", (table) => {
    table.increments("id").primary();
    table
      .integer("base_currency_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("currencies")
      .onDelete("CASCADE");
    table
      .integer("target_currency_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("currencies")
      .onDelete("CASCADE");
    table.decimal("rate", 18, 8).notNullable();
    table.date("date").notNullable();
    table
      .integer("updated_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamps(true, true);
    table.unique(["base_currency_id", "target_currency_id", "date"]);
    table.index(["base_currency_id", "target_currency_id", "date"]);
  });

  await knex.raw(`
        ALTER TABLE exchange_rates
        ADD CONSTRAINT check_different_currencies
        CHECK (base_currency_id <> target_currency_id);
      `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("exchange_rates");
};
