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
    table.decimal("rate", 15, 6).notNullable();
    table.date("effective_from").notNullable();
    table.date("effective_to").nullable();
    table
      .enu("source", ["api", "manual"], {
        useNative: true,
        enumName: "exchange_rate_source_enum",
      })
      .notNullable()
      .defaultTo("manual");
    table
      .integer("updated_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.unique(["base_currency_id", "target_currency_id", "effective_from"]);
    table.index(["base_currency_id", "target_currency_id", "effective_to"]);
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
  await knex.raw(`DROP TYPE IF EXISTS "exchange_rate_source_enum" CASCADE`);
};
