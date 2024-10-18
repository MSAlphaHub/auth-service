import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  const admin = 'd4eeecd5-bb4d-4b5f-9617-08387435052c';
  const userId1 = 'c0509a47-b015-4e63-a8c2-e8817cab706b';
  const userId2 = 'c8f4ee4f-b17f-4d61-ba51-0132fcbb5508';
  const userId3 = 'a3b3eb5e-4408-4cb6-a17e-57a086c1eb01';
  debugger

  // Inserts seed entries
  await knex("users").insert([
    {
      id: admin,
      email: "admin@yopmail.com",
      user_name: "admin",
      first_name: "",
      last_name: "",
      status: "active",
      date_of_birth: null,
      phone: "",
      last_login_date: null,
      is_deleted: false,
    },
    {
      id: userId1,
      email: "johndoe@example.com",
      user_name: "johndoe",
      first_name: "John",
      last_name: "Doe",
      status: "active",
      date_of_birth: null,
      phone: "1234567890",
      last_login_date: null,
      is_deleted: false,
    },
    {
      id: userId2,
      email: "janedoe@example.com",
      user_name: "janedoe",
      first_name: "Jane",
      last_name: "Doe",
      status: "active",
      date_of_birth: null,
      phone: "0987654321",
      last_login_date: null,
      is_deleted: false,
    },
    {
      id: userId3,
      email: "samsmith@example.com",
      user_name: "samsmith",
      first_name: "Sam",
      last_name: "Smith",
      status: "inactive",
      date_of_birth: null,
      phone: "5556667777",
      last_login_date: null,
      is_deleted: false,
    },
  ]);
  await knex("user_auth_method").insert([
    {
      id: knex.raw("uuid_generate_v4()"),
      user_id: admin,
      auth_method: "email",
      identifier: "admin@yopmail.com",
      auth_data: "hashed_password_123",
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
    {
      id: knex.raw("uuid_generate_v4()"),
      user_id: userId1,
      auth_method: "email",
      identifier: "johndoe@example.com",
      auth_data: "hashed_password_123",
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
    {
      id: knex.raw("uuid_generate_v4()"),
      user_id: userId2,
      auth_method: "email",
      identifier: "janedoe@example.com",
      auth_data: "hashed_password_456",
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
    {
      id: knex.raw("uuid_generate_v4()"),
      user_id: userId3,
      auth_method: "google",
      identifier: "samsmith@gmail.com",
      auth_data: "google_auth_token_789",
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
  ]);
  await knex("roles").insert([
    {
      id: knex.raw("uuid_generate_v4()"),
      name: "user",
      is_disable: false,
      is_deleted: false,
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
    {
      id: knex.raw("uuid_generate_v4()"),
      name: "admin",
      is_disable: false,
      is_deleted: false,
      create_by: "system",
      created_at: knex.fn.now(),
      update_by: "system",
      updated_at: knex.fn.now(),
    },
  ]);
}
