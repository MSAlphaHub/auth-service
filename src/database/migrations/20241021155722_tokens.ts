import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tokens", (table) => {
    table.increments("id").primary();
    table.uuid("user_id").notNullable();
    table.text("token").notNullable();
    table.string("type", 50).notNullable();
    table.timestamp("expires_at").notNullable();
    table.boolean("blacklisted").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("tokens");
}
