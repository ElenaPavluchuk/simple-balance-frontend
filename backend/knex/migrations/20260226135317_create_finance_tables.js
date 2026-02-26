/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("currencies", (table) => {
    table.increments("id").primary();
    table.string("code", 3).notNullable().unique();
    table.string("symbol", 3).notNullable();
    table.string("name").notNullable();
    table.integer("precision").notNullable().defaultTo(2);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("full_name").notNullable();
    table.string("profile_image_url").nullable().defaultTo(null);
    table
      .enu("user_role", ["ADMIN", "MEMBER"], {
        useNative: true,
        enumName: "user_role_enum",
      })
      .notNullable()
      .defaultTo("MEMBER");
    table
      .integer("base_currency_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("currencies")
      .onDelete("RESTRICT");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .enu("type", ["INCOME", "EXPENSE"], {
        useNative: true,
        enumName: "category_type_enum",
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
    table.index(["user_id", "type"]);
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
      .enu("type", ["INCOME", "EXPENSE"], {
        useNative: true,
        enumName: "transaction_type_enum",
      })
      .notNullable();
    table.decimal("amount", 15, 2).notNullable();
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
    table.string("title", 200);
    table.text("notes");
    table.timestamps(true, true);
    table.index(["user_id", "date", "type"]);
    table.index(["user_id", "category_id"]);
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

  await knex.raw('DROP TYPE IF EXISTS "user_role_enum" CASCADE');
  await knex.raw('DROP TYPE IF EXISTS "category_type_enum" CASCADE');
  await knex.raw('DROP TYPE IF EXISTS "transaction_type_enum" CASCADE');
};
