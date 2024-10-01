import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("email", 255).unique();
      table.string("user_name", 255);
      table.string("first_name", 255);
      table.string("last_name", 255);
      table.string("status", 50);
      table.dateTime("date_of_birth");
      table.string("phone", 10);
      table.dateTime("last_login_date");
      table.boolean("is_deleted").defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable("user_auth_method", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").notNullable();
      table.string("auth_method", 15).notNullable();
      table.string("identifier", 255).notNullable();
      table.string("auth_data", 255).notNullable();
      table.string("create_by", 32).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("update_by", 32).nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.index(["user_id"]);
    })
    .createTable("user_refresh_tokens", function (table) {
      table.increments("id").primary();
      table.uuid("user_id").notNullable();
      table.string("token", 255).notNullable();
      table
        .timestamp("expiry_timestamp")
        .notNullable()
        .comment("Timestamp indicating token expiration");
      table
        .string("status", 15)
        .notNullable()
        .comment("Status of the token: ACTIVE, INACTIVE");
      table.dateTime("created_at").notNullable();
      table.foreign("user_id").references("id").inTable("users");
    })
    .createTable("roles", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 255);
      table.boolean("is_disable").defaultTo(false);
      table.boolean("is_deleted").defaultTo(false);
      table.string("create_by", 32).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("update_by", 32).nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("resources", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 255);
      table.string("key", 255);
      table.string("description", 255);
      table.boolean("is_deleted").defaultTo(false);
      table.string("create_by", 32).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("update_by", 32).nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("permissions", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("resource_id").notNullable();
      table.string("name", 255);
      table.string("key", 255);
      table.string("description", 255);
      table.boolean("is_deleted").defaultTo(false);
      table.string("create_by", 32).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("update_by", 32).nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.foreign("resource_id").references("id").inTable("resources");
    })
    .createTable("role_permissions", function (table) {
      table.uuid("role_id").notNullable();
      table.uuid("permission_id").notNullable();
      table.boolean("is_deleted").defaultTo(false);
      table.string("create_by", 32).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.string("update_by", 32).nullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.foreign("role_id").references("id").inTable("roles");
      table.foreign("permission_id").references("id").inTable("permissions");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("users")
    .dropTable("user_auth_method")
    .dropTable("user_refresh_tokens")
    .dropTable("roles")
    .dropTable("resources")
    .dropTable("permissions")
    .dropTable("role_permissions");
}
