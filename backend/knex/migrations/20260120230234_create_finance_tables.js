/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("currencies", (table) => {
    table.increments("id").primary();
    table.string("code", 3).notNullable().unique();
    table.string("symbol", 5).notNullable();
    table.string("name").notNullable();
    table.integer("precision").notNullable().defaultTo(2);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table
      .enu("user_role", ["admin", "member"], {
        useNative: true,
        enumName: "user_role",
      })
      .notNullable()
      .defaultTo("member");
    table
      .integer("base_currency_id")
      .unsigned()
      .references("id")
      .inTable("currencies")
      .onDelete("RESTRICT");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .enu("type", ["income", "expense"], {
        useNative: true,
        enumName: "category_type",
      })
      .notNullable();
    table
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
    table.unique(["name", "type", "user_id"]);
  });

  await knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .enu("type", ["income", "expense"], {
        useNative: true,
        enumName: "transaction_type",
      })
      .notNullable();
    table.decimal("amount", 14, 4).notNullable();
    table
      .integer("currency_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("currencies")
      .onDelete("RESTRICT");
    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("RESTRICT");
    table.date("date").notNullable();
    table.string("title");
    table.timestamps(true, true);
    table.index(["user_id", "date"]);
    table.index(["category_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("transactions");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("currencies");

  await knex.raw('DROP TYPE IF EXISTS "transaction_type"');
  await knex.raw('DROP TYPE IF EXISTS "category_type"');
};
