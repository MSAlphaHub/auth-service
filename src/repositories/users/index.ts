import db from "../../database";
import { UUID } from "crypto";
import { IUser } from "../../types";
import { Knex } from "knex";

class UserRepository {
  async finAllUsers() {
    return db
      .getConnection()("users")
      .select(
        "id",
        "user_name",
        "first_name",
        "last_name",
        "date_of_birth",
        "phone",
        "status"
      );
  }

  async findUserById(id: UUID) {
    return db.getConnection()("users").where({ id }).first();
  }

  async findUserByEmail(email: string) {
    return db.getConnection()("users").where({ email }).first();
  }

  async createUser(
    user: Partial<IUser>,
    trx?: Knex.Transaction
  ): Promise<IUser> {
    return trx
      ? db
          .getConnection()("users")
          .transacting(trx)
          .insert({
            email: user.email,
            user_name: user.userName,
            first_name: user.firstName,
            last_name: user.lastName,
            date_of_birth: user.dateOfBirth,
            phone: user.phone,
            status: "ACTIVE",
          })
          .returning([
            "id",
            "user_name",
            "first_name",
            "last_name",
            "date_of_birth",
            "phone",
            "status",
          ])
          .then((rows) => rows[0])
      : db
          .getConnection()("users")
          .insert({
            email: user.email,
            user_name: user.userName,
            first_name: user.firstName,
            last_name: user.lastName,
            date_of_birth: user.dateOfBirth,
            phone: user.phone,
            status: "ACTIVE",
          })
          .returning([
            "id",
            "user_name",
            "first_name",
            "last_name",
            "date_of_birth",
            "phone",
            "status",
          ])
          .then((rows) => rows[0]);
  }
}

export default new UserRepository();
